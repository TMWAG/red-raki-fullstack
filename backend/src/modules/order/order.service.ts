import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import {
	createOrderInput,
	getOrderInfoInput,
	getOrdersByStatusInput,
} from "./order.schema";
import { JwtPayload } from "../../@types";
import EventEmitter from "events";

const event = new EventEmitter();

export async function createOrderHandler(
	req: FastifyRequest<{ Body: createOrderInput }>,
	rep: FastifyReply
) {
	const products = req.body.orderedProducts;
	if (!products) {
		return rep.code(400).send("Не указаны товары");
	}
	let total = 0;
	for (const p of products) {
		const product = await prisma.product.findUnique({
			where: { id: p.productId },
		});
		if (!product) {
			return rep.code(404).send(`Товар с Id ${p.productId} не найден`);
		}
		total += product.price * p.amount;
	}
	const { address, phone, orderedProducts } = req.body;
	const order = await prisma.order.create({
		data: {
			address,
			phone,
			total,
			status: "ACCEPTED",
			orderedProducts: { createMany: { data: [...orderedProducts] } },
		},
	});
	event.emit("newOrder", order);
	return rep.code(201).send(order);
}

export async function getAllOrdersHandler(
	req: FastifyRequest<{ Querystring: getOrdersByStatusInput }>,
	rep: FastifyReply
) {
	const take = req.query.limit || 12;
	const page = req.query.page || 1;
	const skip = take * page - take;
	const orders = await prisma.order.findMany({ 
		take,
		skip,
		orderBy: {createdAt : "desc"}
	});
	return rep.code(200).send(orders);
}

export async function getAllUserOrdersHandler(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const id = (req.user as JwtPayload).id;
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) {
		return rep.code(404).send("Пользователь не найден");
	}
	const count = await prisma.order.count({ where: { phone: user.phone } });
	const orders = await prisma.order.findMany({
		where: { phone: user.phone },
		include: {
			orderedProducts: {
				select: {
					amount: true,
					product: {
						select: { id: true, name: true, price: true, image: true },
					},
				},
			},
		},
	});
	return rep.code(200).send({
		count,
		orders,
	});
}

export async function getOrderInfoHandler(
	req: FastifyRequest<{ Params: getOrderInfoInput }>,
	rep: FastifyReply
) {
	const userId = (req.user as JwtPayload).id;
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) {
		return rep.code(404).send("Пользователь не найден");
	}
	const order = await prisma.order.findUnique({
		where: { id: req.params.id, phone: user.phone },
		select: {
			id: true,
			address: true,
			total: true,
			createdAt: true,
			phone: true,
			status: true,
			orderedProducts: {
				select: {
					amount: true,
					product: {
						select: { id: true, name: true, price: true, image: true },
					},
				},
			},
		},
	});
	if (!order) {
		return rep.code(404).send(`Заказ с Id: ${req.params.id} не найден`);
	}
	return rep.code(200).send(order);
}

export async function newOrdersHandler(req: FastifyRequest, rep: FastifyReply) {
	event.once("newOrder", (order) => {
		return rep.code(200).send(order);
	});
}
