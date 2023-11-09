import { FastifyReply, FastifyRequest } from "fastify";
import { deleteProductInput, getProductInput, getProductsInput } from "./product.schema";
import prisma from "../../utils/prisma";
import { IProductInput } from "../../@types";
import writeImage, { baseFilepath } from "../../utils/writeImage";
import { acceptedTypes } from "../../utils/constants/acceptedTypes";
import { rm } from "fs/promises";
import path from "path";

export async function createProductHandler(
	req: FastifyRequest<{ Body: IProductInput }>,
	rep: FastifyReply
) {
	if (!req.body.categoryId) {
		return rep.code(400).send("Не указана категория товара");
	}
	const categoryId = req.body.categoryId.value;

	if (!req.body.name) {
		return rep.code(400).send("Не указано название товара");
	}
	const name = req.body.name.value;

	if (!req.body.price) {
		return rep.code(400).send("Не указана цена товара");
	}
	const price = Number(req.body.price.value);

	if (!req.body.description) {
		return rep.code(400).send("Не указано описание");
	}
	const description = req.body.description.value;

	if (!req.body.image) {
		return rep.code(400).send("Не задано изображение");
	}
	if (!acceptedTypes.includes(req.body.image.mimetype)) {
		return rep.code(400).send("Изображение имеет неподдерживаемый формат");
	}
	const image = await writeImage(req.body.image, "products");

	if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
		return rep.code(404).send(`Категория с Id: ${categoryId} не найдена`);
	}

	return rep.code(201).send(
		await prisma.product.create({
			data: {
				name,
				price,
				categoryId,
				description,
				image,
			},
		})
	);
}

export async function getAllProductsHandler(
	req: FastifyRequest<{ Querystring: getProductsInput }>,
	rep: FastifyReply
) {
	const { categoryId } = req.query;
	return rep.code(200).send({
		count: await prisma.product.count(),
		products: await prisma.product.findMany({ where: { categoryId }}),
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
	req: FastifyRequest<{ Body: IProductInput; Params: { id: string } }>,
	rep: FastifyReply
) {
	const { id } = req.params;
	const product = await prisma.product.findUnique({ where: { id } })
	if (!product) {
		return rep.code(404).send(`Товар с Id: ${id} не найден`);
	}

	if (!req.body.categoryId) {
		return rep.code(400).send("Id категории не указан");
	}
	const categoryId = req.body.categoryId.value;
	if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
		return rep.code(404).send(`Категории с Id: ${categoryId} не существует`);
	}

	let image = undefined;
	if (req.body.image) {
		image = await writeImage(req.body.image, 'products');
		await rm(path.join(baseFilepath, 'products', product.image));
	}

	return rep.code(200).send(
		await prisma.product.update({
			where: { id },
			data: {
				categoryId,
				description: req.body.description?.value,
				name: req.body.name?.value,
				price: Number(req.body.price?.value),
				image,
			},
		})
	);
}

export async function deleteProductHandler(
	req: FastifyRequest<{ Params: deleteProductInput }>,
	rep: FastifyReply
) {
	const { id } = req.params;
	if (!(await prisma.product.findUnique({ where: { id } }))) {
		return rep.code(404).send(`Товар с Id: ${id} не найден`);
	}
	const product = await prisma.product.delete({ where: { id } });
	rm(path.join(baseFilepath, 'products', product.image));
	return rep.code(200).send(product);
}
