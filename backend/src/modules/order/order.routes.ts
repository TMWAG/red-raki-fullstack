import { FastifyInstance } from "fastify";
import {
	createOrderInput,
	createOrderResponseSchema,
	createOrderSchema,
	getOrderInfoInput,
	getOrderInfoResponseSchema,
	getOrdersByStatusInput,
} from "./order.schema";
import {
	createOrderHandler,
	getAllOrdersHandler,
	getAllUserOrdersHandler,
	getOrderInfoHandler,
	newOrdersHandler,
} from "./order.service";

export default async function orderRoutes(app: FastifyInstance) {
	app.post<{ Body: createOrderInput }>(
		"/",
		{
			schema: {
				body: createOrderSchema,
				response: {
					201: createOrderResponseSchema,
				},
			},
		},
		createOrderHandler
	);
	app.get<{ Querystring: getOrdersByStatusInput }>(
		"/all",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
		},
		getAllOrdersHandler
	);
	app.get(
		"/my",
		{
			preHandler: [app.authenticate],
			schema: {
				response: {},
			},
		},
		getAllUserOrdersHandler
	);
	app.get<{ Params: getOrderInfoInput }>(
		"/id/:id",
		{
			preHandler: [app.authenticate],
			schema: {
				response: {
					200: getOrderInfoResponseSchema,
				},
			},
		},
		getOrderInfoHandler
	);
	app.get(
		"/manage",
		{
			preHandler: [app.authorizeAdminOrSupervisor],
		},
		newOrdersHandler
	);
}
