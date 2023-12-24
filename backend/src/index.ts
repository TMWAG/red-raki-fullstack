import fastify from "fastify";
import routes from "./modules";
import fjwt from "@fastify/jwt";
import auth from "./decorators/auth";
import cors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import prisma from "./utils/prisma";
import bcrypt from "bcryptjs";


async function createAdmin() {
	const admin = await prisma.employee.findUnique({
		where: {
			login: 'admin',
			AND: {
				role: 'ADMIN',
			},
		},
	});
	if (!admin) {
		await prisma.employee.create({
			data: {
				login: 'admin',
				name: 'admin',
				password: await bcrypt.hash('admin', 10),
				role: "ADMIN",
			},
		});
	}
}

export const app = fastify({
	logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fjwt, {
	secret: String(process.env.JWT_SALT),
});
app.register(cors, {
	origin: true,
})

app.register(auth);

app.register(routes, { prefix: '/api' });

app.listen(
	{
		port: 3001,
		host: "0.0.0.0",
	},
	async (err, address) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}
		createAdmin();
		console.log(`server is listening on ${address}`);
	}
);
