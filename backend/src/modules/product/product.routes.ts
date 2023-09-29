import { FastifyInstance } from "fastify";
import {
	createProductHandler,
	deleteProductHandler,
	getAllProductsHandler,
	getProductHandler,
	updateProductHandler,
} from "./product.service";
import {
	createProductResponseSchema,
	deleteProductInput,
	deleteProductResponseSchema,
	deleteProductSchema,
	getProductInput,
	getProductResponseSchema,
	getProductSchema,
	getProductsResponseSchema,
	updateProductResponseSchema,
} from "./product.schema";
import { IProductInput } from "../../@types";
import fastifyMultipart from "@fastify/multipart";

export default async function productRoutes(app: FastifyInstance) {
	app.register(fastifyMultipart, { attachFieldsToBody: true });
	app.post<{
		Body: IProductInput;
	}>(
		"/",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
			schema: {
				response: {
					201: createProductResponseSchema,
				},
			},
		},
		createProductHandler
	);
	app.get(
		"/",
		{
			schema: {
				response: {
					200: getProductsResponseSchema,
				},
			},
		},
		getAllProductsHandler
	);
	app.get<{ Params: getProductInput }>(
		"/:id",
		{
			schema: {
				params: getProductSchema,
				response: {
					200: getProductResponseSchema,
				},
			},
		},
		getProductHandler
	);
	app.patch<{ Body: IProductInput; Params: { id: string } }>(
		"/:id",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
			schema: {
				response: {
					200: updateProductResponseSchema,
				},
			},
		},
		updateProductHandler
	);
	app.delete<{ Params: deleteProductInput }>(
		"/:id",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
			schema: {
				params: deleteProductSchema,
				response: {
					200: deleteProductResponseSchema,
				},
			},
		},
		deleteProductHandler
	);
}
