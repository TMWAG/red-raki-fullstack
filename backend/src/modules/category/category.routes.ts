import { FastifyInstance } from "fastify";
import {
	createCategoryHandler,
	deleteCategoryHandler,
	editCategoryHandler,
	getCategoriesHandler,
} from "./category.service";
import fastifyMultipart from "@fastify/multipart";
import {
	createCategoryResponseSchema,
	deleteCategoryInput,
	getCategoriesResponseSchema,
	updateCategoryResponseSchema,
} from "./category.schema";
import { ICategoryInput } from "../../@types";

export default async function categoryRoutes(app: FastifyInstance) {
	app.register(fastifyMultipart, { attachFieldsToBody: true });
	app.post<{ Body: ICategoryInput }>(
		"/",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
			schema: {
				response: {
					201: createCategoryResponseSchema,
				},
			},
		},
		createCategoryHandler
	);
	app.get(
		"/",
		{
			schema: {
				response: {
					200: getCategoriesResponseSchema,
				},
			},
		},
		getCategoriesHandler
	);
	app.patch<{ Body: ICategoryInput; Params: { id: string } }>(
		"/:id",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
			schema: {
				response: {
					200: updateCategoryResponseSchema,
				},
			},
		},
		editCategoryHandler
	);
	app.delete<{ Params: deleteCategoryInput }>(
		"/:id",
		{
			preHandler: [app.authorizeAdmin],
		},
		deleteCategoryHandler
	);
}
