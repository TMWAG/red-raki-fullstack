import { FastifyInstance } from "fastify";
import {
	createCategoryHandler,
	deleteCategoryHandler,
	editCategoryHandler,
	getCategoriesHandler,
} from "./category.service";
import {
	createCategoryInput,
	createCategoryResponseSchema,
	createCategorySchema,
	deleteCategoryInput,
	deleteCategoryResponseSchema,
	deleteCategorySchema,
	getCategoriesResponseSchema,
	updateCategoryBodyInput,
	updateCategoryBodySchema,
	updateCategoryParamsInput,
	updateCategoryParamsSchema,
	updateCategoryResponseSchema,
} from "./category.schema";

export default async function categoryRoutes(app: FastifyInstance) {
	app.post<{ Body: createCategoryInput }>(
		"/",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
			schema: {
				body: createCategorySchema,
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
	app.patch<{
		Body: updateCategoryBodyInput;
		Params: updateCategoryParamsInput;
	}>(
		"/:id",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
			schema: {
				body: updateCategoryBodySchema,
				params: updateCategoryParamsSchema,
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
			schema: {
				params: deleteCategorySchema,
				response: {
					200: deleteCategoryResponseSchema,
				}
			}
		},
		deleteCategoryHandler
	);
}
