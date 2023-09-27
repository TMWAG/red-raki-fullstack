import { FastifyInstance } from "fastify";
import userRoutes from "./user/user.routes";

export default async function routes(app: FastifyInstance) {
  app.register(userRoutes, {prefix: '/user'});
}