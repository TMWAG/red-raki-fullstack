import { FastifyInstance } from "fastify";
import {
	createProductHandler,
	deleteProductHandler,
	getAllProductsHandler,
	getProductHandler,
	updateProductHandler,
} from "./product.service";
import {
	createProductSuccessResponseSchema,
	deleteProductInput,
	deleteProductResponseSchema,
	deleteProductSchema,
	getProductInput,
	getProductResponseSchema,
	getProductSchema,
	getProductsInput,
	getProductsResponseSchema,
	getProductsSchema,
	updateProductResponseSchema,
} from "./product.schema";
import { IProductInput } from "../../@types";
import fastifyMultipart from "@fastify/multipart";
import { errorResponseSchema } from "../../utils/errorResponseSchema";

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
					201: createProductSuccessResponseSchema,
					400: errorResponseSchema,
					403: errorResponseSchema,
					404: errorResponseSchema,
				},
			},
		},
		createProductHandler
	);
	app.get<{ Querystring: getProductsInput }>(
		"/",
		{
			schema: {
				querystring: getProductsSchema,
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
					404: errorResponseSchema,
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
					400: errorResponseSchema,
					403: errorResponseSchema,
					404: errorResponseSchema,
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
					403: errorResponseSchema,
					404: errorResponseSchema,
				},
			},
		},
		deleteProductHandler
	);
}
