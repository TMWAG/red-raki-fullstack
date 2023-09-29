import { MultipartFile } from "@fastify/multipart";
import { randomUUID } from "crypto";
import { access, mkdir, writeFile } from "fs/promises";
import path from "path";

export const baseFilepath = path.join(__dirname, "..", "..", "static");

export default async function writeImage(
	image: MultipartFile,
	destinationFolder: string
): Promise<string> {
  const filenameChunks = image.filename.split(".");
	const extension = filenameChunks[filenameChunks.length - 1];
	const newFilename = `${randomUUID()}.${extension}`;
  const filepath = path.join(baseFilepath, destinationFolder);
  try {
		await access(filepath);
	} catch (e) {
		await mkdir(filepath, { recursive: true });
	}
  await writeFile(
		path.join(filepath, newFilename),
		await image.toBuffer()
	);
  return newFilename;
}
