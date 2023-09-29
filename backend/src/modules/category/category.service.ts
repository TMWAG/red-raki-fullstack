import { MultipartFile, MultipartValue } from "@fastify/multipart";
import { randomUUID } from "crypto";
import { access, mkdir, rm, writeFile } from "fs/promises";
import path from "path";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";

const acceptedTypes = [
	"image/apng",
	"image/avif",
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/webp",
];
const filepath = path.join(__dirname, "..", "..", "static", "categories");

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
	const filenameChunks = req.body.image.filename.split(".");
	const extension = filenameChunks[filenameChunks.length - 1];
	const newFilename = `${randomUUID()}.${extension}`;
	try {
		await access(filepath);
	} catch (e) {
		await mkdir(filepath, { recursive: true });
	}
	await writeFile(
		path.join(filepath, newFilename),
		await req.body.image.toBuffer()
	);
	const category = await prisma.category.create({
		data: { name: req.body.name.value, image: newFilename },
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
		Body: {
			id?: MultipartValue<string>;
			name?: MultipartValue<string>;
			image?: MultipartFile;
		};
	}>,
	rep: FastifyReply
) {
	if (!req.body) {
		return rep.code(400).send();
	}
	if (!req.body.id) {
		return rep.code(400).send("Не указан Id категории");
	}
	const id = req.body.id.value;
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
		const filenameChunks = req.body.image.filename.split(".");
		try {
			await rm(path.join(filepath, filename));
		} catch (e) {
			return rep.code(500).send(e);
		}
		const extension = filenameChunks[filenameChunks.length - 1];
		filename = `${randomUUID()}.${extension}`;
		await writeFile(
			path.join(filepath, filename),
			await req.body.image.toBuffer()
		);
	}
	const updatedCategory = await prisma.category.update({
		where: { id },
		data: { image: filename, name: req.body.name?.value || category.name },
	});
	return rep.code(200).send(updatedCategory);
}

export async function deleteCategoryHandler(
	req: FastifyRequest<{ Params: { id: string } }>,
	rep: FastifyReply
) {
	const { id } = req.params;
	if (!id) {
		return rep.code(400).send('Не указан Id');
	}
	const toDelete = await prisma.category.findUnique({ where: { id } });
	if (!toDelete) {
		return rep.code(404).send('Указанная категория не найдена');
	}
	const category = await prisma.category.delete({ where: { id } });
	await rm(path.join(filepath, category.image));
	return rep.code(200).send(category.id);
}
