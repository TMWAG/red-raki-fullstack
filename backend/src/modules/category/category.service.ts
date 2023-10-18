import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import {
	createCategoryInput,
	deleteCategoryInput,
	updateCategoryBodyInput,
	updateCategoryParamsInput,
} from "./category.schema";

export async function createCategoryHandler(
	req: FastifyRequest<{
		Body: createCategoryInput;
	}>,
	rep: FastifyReply
) {
	const { name } = req.body;
	const category = await prisma.category.create({ data: { name } });
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
		Body: updateCategoryBodyInput;
		Params: updateCategoryParamsInput;
	}>,
	rep: FastifyReply
) {
	const { id } = req.params;
	const { name } = req.body;
	if (!id) {
		return rep.code(400).send("Не указан Id категории");
	}
	const category = await prisma.category.findUnique({
		where: { id },
	});
	if (!category) {
		return rep.code(404).send(`Категория с Id ${id} не найдена`);
	}
	const updatedCategory = await prisma.category.update({
		where: { id },
		data: { name },
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
	return rep.code(200).send({ id : category.id });
}
