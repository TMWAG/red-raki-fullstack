import { FastifyInstance } from "fastify";
import {
	createCategoryHandler,
	deleteCategoryHandler,
	editCategoryHandler,
	getCategoriesHandler,
} from "./category.service";
import fastifyMultipart, {
	MultipartFile,
	MultipartValue,
} from "@fastify/multipart";
import {
	createCategoryResponseSchema,
	getCategoriesResponseSchema,
  updateCategoryResponseSchema,
} from "./category.schema";

export default async function categoryRoutes(app: FastifyInstance) {
	app.register(fastifyMultipart, { attachFieldsToBody: true });
	app.post<{ Body: { name?: MultipartValue<string>; image?: MultipartFile } }>(
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
	app.patch<{ Body: { id?: MultipartValue<string>; name?: MultipartValue<string>; image?: MultipartFile } }>(
		"/",
		{ 
      preHandler: [app.authorizeAdminOrSupervisor],
      schema: {
        response: {
          200: updateCategoryResponseSchema,
        }
      }
    },
		editCategoryHandler
	);
	app.delete<{Params: { id: string } }>(
    "/:id",
    {
      preHandler: [app.authorizeAdmin],
    },
    deleteCategoryHandler
  );
}
