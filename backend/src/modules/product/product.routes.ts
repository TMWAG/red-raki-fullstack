import { FastifyInstance } from "fastify";
import { createProductHandler, deleteProductHandler, getAllProductsHandler, getProductHandler, updateProductHandler } from "./product.service";
import { createProductInput, createProductResponseSchema, createProductSchema, deleteProductInput, deleteProductResponseSchema, deleteProductSchema, getProductInput, getProductResponseSchema, getProductSchema, getProductsResponseSchema, updateProductInput, updateProductResponseSchema, updateProductSchema } from "./product.schema";

export default async function productRoutes(app: FastifyInstance) {
  app.post<{ Body: createProductInput }>(
    '/',
    {
      preHandler: [app.authorizeAdminOrSupervisor],
      schema: {
        body: createProductSchema,
        response: {
          201: createProductResponseSchema,
        },
      },
    },
    createProductHandler
  );
  app.get(
    '/',
    {
      schema: {
        response: {
          200: getProductsResponseSchema,
        },
      },
    },
    getAllProductsHandler,
  );
  app.get<{ Params: getProductInput }>(
    '/:id',
    {
      schema: {
        params: getProductSchema,
        response: {
          200: getProductResponseSchema,
        },
      },
    },
    getProductHandler,
  );
  app.patch<{ Body: updateProductInput }>(
    '/',
    {
      preHandler: [app.authorizeAdminOrSupervisor],
      schema: {
        body: updateProductSchema,
        response: {
          200: updateProductResponseSchema,
        },
      },
    },
    updateProductHandler,
  );
  app.delete<{ Params: deleteProductInput }>(
    '/:id',
    {
      preHandler: [app.authorizeAdminOrSupervisor],
      schema: {
        params: deleteProductSchema,
        response: {
          200: deleteProductResponseSchema,
        },
      },
    },
    deleteProductHandler,
  );
}