import fastify from "fastify";
import routes from "./modules";
import fjwt from "@fastify/jwt";
import auth from "./decorators/auth";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

export const app = fastify({
	logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(fjwt, { secret: String(process.env.JWT_SALT) });

app.register(auth);

app.register(routes);

app.listen(
	{
		port: 3001,
		host: "0.0.0.0",
	},
	(err, address) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}
		console.log(`server is listening on ${address}`);
	}
);
