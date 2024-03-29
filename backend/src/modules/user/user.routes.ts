import { FastifyInstance } from "fastify";
import { addSupervisorHandler, changePasswordHandler, getAllUsersHandler, loginUserHandler, /* loginUserHandler */ } from "./user.service";
import { ChangePasswordInput, CreateUserInput, changePasswordSchema, createUserResponseSchema, createUserSchema, getAllUsersResponseSchema, loginUserResponseSchema, loginUserSchema } from "./user.schema";
import { errorResponseSchema } from "../../utils/errorResponseSchema";

export default async function userRoutes(app: FastifyInstance) {
  /* app.post(
    '/register',
    {
      schema: { 
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
          400: errorResponseSchema,
        },
      },
    },
    registerUserHandler,
  ); */
  app.post(
    '/login',
    {
      schema: {
        body: loginUserSchema,
        response: {
          200: loginUserResponseSchema,
          400: errorResponseSchema,
          404: errorResponseSchema,
        },
      },
    },
    loginUserHandler,
  );
  app.post<{ Body: CreateUserInput }>(
    '/add_user',
    {
      preHandler: [app.authorizeAdmin],
      schema: {
        body: createUserSchema,
        response: {
          201: createUserResponseSchema
        },
      },
    },
    addSupervisorHandler
  );
  app.patch<{ Body: ChangePasswordInput }>(
    '/change_password',
    {
      preHandler: [app.authenticate],
      schema: {
        body: changePasswordSchema,
      }
    },
    changePasswordHandler
  );
  app.get(
    '/all',
    {
      preHandler: [app.authorizeAdmin],
      schema: {
        response: {
          200: getAllUsersResponseSchema,
          403: errorResponseSchema,
        }
      }
    },
    getAllUsersHandler,
  );
}