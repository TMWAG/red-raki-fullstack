import { FastifyReply, FastifyRequest } from "fastify";
import {
	deleteProductInput,
	getProductInput,
	getProductsInput,
} from "./product.schema";
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
		return rep.code(400).send({
			error: "PRD_CRT_CTG",
			message: "Не указана категория товара",
			detail: "Категория товара должна быть указана",
		});
	}
	if (!req.body.name) {
		return rep.code(400).send({
			error: "PRD_CRT_NME",
			message: "Не указано название товара",
			detail: "Название товара должно быть указано",
		});
	}
	if (!req.body.price) {
		return rep.code(400).send({
			error: "PRD_CRT_PRC",
			message: "Не указана цена товара",
			detail: "Цена товара должна быть указана",
		});
	}
	if (!req.body.image) {
		return rep.code(400).send({
			error: "PRD_CRT_IMG",
			message: "Не задано изображение",
			detail: "Изображение товара должно быть задано",
		});
	}
	if (!acceptedTypes.includes(req.body.image.mimetype)) {
		return rep.code(400).send({
			error: "PRD_CRT_IMG_UC",
			message: "Изображение имеет неподдерживаемый формат",
			detail: "Изображение может быть следующих типов: ".concat(
				acceptedTypes.toString()
			),
		});
	}
	if (
		!(await prisma.category.findUnique({
			where: { id: req.body.categoryId.value },
		}))
	) {
		return rep.code(404).send({
			error: "PRD_CTR_CTG_MSS",
			message: `Категория с Id: ${req.body.categoryId.value} не найдена`,
			detail: "Категория не существует",
		});
	}
	const createdImage = await writeImage(req.body.image, "products");
	return rep.code(201).send(
		await prisma.product.create({
			data: {
				categoryId: req.body.categoryId.value,
				name: req.body.name.value,
				price: Number(req.body.price.value),
				description: req.body.description?.value,
				notes: req.body.notes?.value,
				image: createdImage,
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
		products: await prisma.product.findMany({ where: { categoryId } }),
	});
}

export async function getProductHandler(
	req: FastifyRequest<{ Params: getProductInput }>,
	rep: FastifyReply
) {
	const { id } = req.params;
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) {
		return rep.code(404).send({
			error: "PRD_GT_NF",
			message: `Товар с Id: ${id} не найден`,
			detail: "Товар не существует",
		});
	}
	return rep.code(200).send(product);
}

export async function updateProductHandler(
	req: FastifyRequest<{ Body: IProductInput; Params: { id: string } }>,
	rep: FastifyReply
) {
	const { id } = req.params;
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) {
		return rep.code(404).send({
			error: "PRD_UPD_NF",
			message: `Товар с Id: ${id} не найден`,
			detail: "Товар не существует",
		});
	}

	if (!req.body.categoryId) {
		return rep.code(400).send({
			error: "PRD_UPD_CTG",
			message: "Id категории не указан",
			detail: "Необходимо указать категорию",
		});
	}
	const categoryId = req.body.categoryId.value;
	if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
		return rep.code(404).send({
			error: "PRD_UPD_CTG_NF",
			message: `Категории с Id: ${categoryId} не существует`,
			detail: "Категории не существует",
		});
	}

	let image = undefined;
	if (req.body.image) {
		image = await writeImage(req.body.image, "products");
		await rm(path.join(baseFilepath, "products", product.image));
	}

	return rep.code(200).send(
		await prisma.product.update({
			where: { id },
			data: {
				categoryId,
				description: req.body.description?.value,
				notes: req.body.notes?.value,
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
		return rep.code(404).send({
			error: "PRD_DEL_NF",
			message: `Товар с Id: ${id} не найден`,
			detail: "Товар не существует",
		});
	}
	const product = await prisma.product.delete({ where: { id } });
	rm(path.join(baseFilepath, "products", product.image));
	return rep.code(200).send(product);
}
