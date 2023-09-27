import { FastifyInstance } from "fastify";
import { getAllUsersHandler, loginUserHandler, registerUserHandler } from "./user.service";
import { createUserResponseSchema, createUserSchema, getAllUsersResponseSchema, loginUserResponseSchema, loginUserSchema } from "./user.schema";

export default async function userRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: { 
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
        },
      },
    },
    registerUserHandler,
  );
  app.post(
    '/login',
    {
      schema: {
        body: loginUserSchema,
        response: {
          200: loginUserResponseSchema,
        },
      },
    },
    loginUserHandler,
  );
  app.get(
    '/all',
    {
      preHandler: [app.authorizeAdmin],
      schema: {
        response: {
          200: getAllUsersResponseSchema,
        }
      }
    },
    getAllUsersHandler,
  );
}