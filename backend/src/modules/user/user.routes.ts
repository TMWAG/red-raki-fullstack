import { FastifyInstance } from "fastify";
import { registerUserHandler } from "./user.service";

export default async function userRoutes(app: FastifyInstance) {
  app.get(
    '/',
    registerUserHandler
  )
}