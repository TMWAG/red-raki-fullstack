import { FastifyReply, FastifyRequest } from "fastify";
import {
	ChangePasswordInput,
	CreateUserInput,
	LoginUserInput,
} from "./user.schema";
import bcrypt from "bcryptjs";
import prisma from "../../utils/prisma";
import { app } from "../..";
import { randomUUID } from "crypto";
import { transliterate } from "../../utils/tansliterate";
import { JwtPayload } from "../../@types";

/* export async function registerUserHandler(
	req: FastifyRequest<{ Body: CreateUserInput }>,
	rep: FastifyReply
) {
	try {
		const user = await prisma.user.findUnique({
			where: { phone: req.body.phone },
		});
		if (user) {
			return rep.code(400).send({
				error: "USR_REG_DUP",
				message: `Пользователь с номером телефона ${req.body.phone} уже зарегистрирован`,
				detail:
					"Невозможно зарегистрировать два аккаунта на один номер телефона, попробуйте войти в существующий аккаунт",
			});
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		return rep.code(201).send(
			await prisma.user.create({
				data: { ...req.body, password: hashedPassword },
			})
		);
	} catch (e) {
		return rep.code(500).send(e);
	}
} */

export async function addSupervisorHandler(
	req: FastifyRequest<{ Body: CreateUserInput }>,
	rep: FastifyReply
) {
	const login = `${transliterate(req.body.name)}_${transliterate(
		req.body.surname
	)}`;
	const newSupervisor = await prisma.employee.create({
		data: {
			password: await bcrypt.hash(login, 10),
			name: req.body.name,
			login,
			surname: req.body.surname,
			role: req.body.role,
		},
	});
	return rep.code(201).send(newSupervisor);
}

export async function changePasswordHandler(
	req: FastifyRequest<{ Body: ChangePasswordInput }>,
	rep: FastifyReply
) {
	const user = await prisma.employee.findUnique({
		where: {
			id: (req.user as JwtPayload).id,
		},
	});
	if (!user) {
		return rep.code(404).send({
			error: "USR_CPW_NF",
			message: "Пользователь не найден",
			detail: "Пользователь с данной подписью не числится",
		});
	}
	if (!(await bcrypt.compare(req.body.oldPassword, user.password))) {
		return rep.code(400).send({
			error: "USR_CPW_WPW",
			message: "Указан неверный пароль",
			detail: "Старый пароль указан неверно",
		});
	}
	await prisma.employee.update({
		where: { id: user.id },
		data: {
			password: await bcrypt.hash(req.body.newPassword, 10),
		},
	});
	return rep.code(200).send();
}

export async function loginUserHandler(
	req: FastifyRequest<{ Body: LoginUserInput }>,
	rep: FastifyReply
) {
	const user = await prisma.employee.findUnique({
		where: { login: req.body.login },
	});
	if (!user) {
		return rep.code(404).send({
			error: "USR_LGN_NF",
			message: "Пользователь не найден",
			detail: `Пользователь с логином ${req.body.login} не найден`,
		});
	}
	if (!(await bcrypt.compare(req.body.password, user.password!))) {
		return rep.code(400).send({
			error: "USR_LGN_WPW",
			message: "Неверный пароль",
			detail: "Указан неверный пароль",
		});
	}
	return rep.send({
		...user,
		token: app.jwt.sign({ id: user.id }),
	});
}

export async function getAllUsersHandler(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const users = await prisma.employee.findMany({
		select: {
			id: true,
			name: true,
			surname: true,
			role: true,
			login: true,
		},
	});
	const count = await prisma.employee.count();
	return {
		count,
		users,
	};
}
