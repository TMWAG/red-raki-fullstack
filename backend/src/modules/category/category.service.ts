import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { rm } from "fs/promises";
import path from "path";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { acceptedTypes } from "../../utils/constants/acceptedTypes";
import writeImage, { baseFilepath } from "../../utils/writeImage";
import { ICategoryInput } from "../../@types";
import { deleteCategoryInput } from "./category.schema";

export async function createCategoryHandler(
	req: FastifyRequest<{
		Body: { name?: MultipartValue<string>; image?: MultipartFile };
	}>,
	rep: FastifyReply
) {
	if (!req.body.image) {
		return rep.code(400).send("Необходимо прикрепить изображение");
	}
	if (!acceptedTypes.includes(req.body.image.mimetype)) {
		return rep.code(400).send("Изображение имеет неподдерживаемый формат");
	}
	if (!req.body.name) {
		return rep.code(400).send("Необходимо указать название категории");
	}
	const category = await prisma.category.create({
		data: {
			name: req.body.name.value,
			image: await writeImage(req.body.image, "categories"),
		},
	});
	return rep.code(201).send(category);
}

export async function getCategoriesHandler(
	req: FastifyRequest,
	rep: FastifyReply
) {
	const categories = await prisma.category.findMany();
	return rep.code(200).send({ count: categories.length, categories });
}

export async function editCategoryHandler(
	req: FastifyRequest<{
		Body: ICategoryInput;
		Params: { id: string };
	}>,
	rep: FastifyReply
) {
	if (!req.body) {
		return rep.code(400).send();
	}
	const { id } = req.params; 
	if (!id) {
		return rep.code(400).send("Не указан Id категории");
	}
	const category = await prisma.category.findUnique({
		where: { id },
	});
	if (!category) {
		return rep.code(404).send(`Категория с Id ${id} не найдена`);
	}
	let filename = category.image;
	if (req.body.image) {
		if (!acceptedTypes.includes(req.body.image.mimetype)) {
			return rep.code(400).send("Изображение имеет неподдерживаемый формат");
		}
		filename = await writeImage(req.body.image, "categories");
	}
	const updatedCategory = await prisma.category.update({
		where: { id },
		data: { image: filename, name: req.body.name?.value || category.name },
	});
	return rep.code(200).send(updatedCategory);
}

export async function deleteCategoryHandler(
	req: FastifyRequest<{ Params: deleteCategoryInput }>,
	rep: FastifyReply
) {
	const { id } = req.params;
	if (!id) {
		return rep.code(400).send("Не указан Id");
	}
	const toDelete = await prisma.category.findUnique({ where: { id } });
	if (!toDelete) {
		return rep.code(404).send("Указанная категория не найдена");
	}
	const category = await prisma.category.delete({ where: { id } });
	await rm(path.join(baseFilepath, 'categories', category.image));
	return rep.code(200).send(category.id);
}
