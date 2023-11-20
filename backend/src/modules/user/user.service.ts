import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, LoginUserInput } from "./user.schema";
import bcrypt from "bcryptjs";
import prisma from "../../utils/prisma";
import { app } from "../..";

export async function registerUserHandler(
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
}

export async function loginUserHandler(
	req: FastifyRequest<{ Body: LoginUserInput }>,
	rep: FastifyReply
) {
  if (!req.body.phone) {
    return rep.code(400).send({
      error: "USR_LGN_NPH",
      message: "Не указан номер телефона",
      detail: "Для входа необходимо указать номер телефона",
    });
  }
	const user = await prisma.user.findUnique({
		where: { phone: req.body.phone },
	});
	if (!user) {
		return rep.code(404).send({
      error: "USR_LGN_NF",
      message: "Пользователь не найден",
      detail: `Пользователь с номером телефона ${req.body.phone} не найден`,
    });
	}
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return rep.code(400).send({
      error: "USR_LGN_WPW",
      message: "Неверный пароль",
      detail: "Указан неверный пароль",
    })
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
	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			phone: true,
			role: true,
		},
	});
	const count = await prisma.user.count();
	return {
		count,
		users,
	};
}
