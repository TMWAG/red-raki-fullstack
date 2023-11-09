import { FastifyInstance } from "fastify";
import { createOrderInput, createOrderResponseSchema, createOrderSchema, getAllUserOrdersResponseSchema, getOrderInfoInput, getOrderInfoResponseSchema, getOrderInfoSchema } from "./order.schema";
import { createOrderHandler, getAllUserOrdersHandler, getOrderInfoHandler, newOrdersHandler } from "./order.service";

export default async function orderRoutes(app: FastifyInstance) {
  app.post<{ Body: createOrderInput }>(
    '/',
    {
      schema: {
        body: createOrderSchema,
        response: {
          201: createOrderResponseSchema,
        },
      },
    },
    createOrderHandler,
  );
  app.get(
    '/',
    {
      preHandler: [app.authenticate],
      schema: {
        response: {
          200: getAllUserOrdersResponseSchema,
        },
      },
    },
    getAllUserOrdersHandler,
  );
  app.get<{ Params: getOrderInfoInput }>(
    '/:id',
    {
      preHandler: [app.authenticate],
      schema: {
        params: getOrderInfoSchema,
        response: {
          200: getOrderInfoResponseSchema,
        },
      },
    },
    getOrderInfoHandler,
  );
  app.get(
    '/manage',
    {
      preHandler: [app.authorizeAdminOrSupervisor],
    },
    newOrdersHandler,
  );
}