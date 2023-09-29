import { FastifyReply, FastifyRequest } from "fastify";
import {
	createProductInput,
	deleteProductInput,
	getProductInput,
	updateProductInput,
} from "./product.schema";
import prisma from "../../utils/prisma";

export async function createProductHandler(
	req: FastifyRequest<{ Body: createProductInput }>,
	rep: FastifyReply
) {
	if (
		!(await prisma.category.findUnique({ where: { id: req.body.categoryId } }))
	) {
		return rep
			.code(404)
			.send(`Категория с Id: ${req.body.categoryId} не найдена`);
	}
	const { categoryId, name, price, description } = req.body;
	const product = await prisma.product.create({
		data: {
			name,
			price,
			categoryId,
			description,
		},
	});
	return rep.code(201).send(product);
}

export async function getAllProductsHandler(
	req: FastifyRequest,
	rep: FastifyReply
) {
	return rep.code(200).send({
		count: await prisma.product.count(),
		products: await prisma.product.findMany(),
	});
}

export async function getProductHandler(
	req: FastifyRequest<{ Params: getProductInput }>,
	rep: FastifyReply
) {
	const { id } = req.params;
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) {
		return rep.code(404).send(`Товар с Id: ${id} не найден`);
	}
	return rep.code(200).send(product);
}

export async function updateProductHandler(
	req: FastifyRequest<{ Body: updateProductInput }>,
	rep: FastifyReply
) {
	const { categoryId, id, name, price, description } = req.body;
	if (!(await prisma.product.findUnique({ where: { id } }))) {
		return rep.code(404).send(`Товар с Id: ${id} не найден`);
	}
	if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
		return rep.code(404).send(`Категории с Id: ${categoryId} не существует`);
	}
	return rep
		.code(200)
		.send(
			await prisma.product.update({
				where: { id },
				data: { categoryId, description, name, price },
			})
		);
}

export async function deleteProductHandler(
	req: FastifyRequest<{ Params: deleteProductInput }>,
	rep: FastifyReply
) {
  const { id } = req.params;
  if (!await prisma.product.findUnique({ where: { id } })) {
    return rep.code(404).send(`Товар с Id: ${id} не найден`);
  }
  return rep.code(200).send(await prisma.product.delete({ where: { id } }));
}
