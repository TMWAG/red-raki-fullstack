import { FastifyReply, FastifyRequest } from "fastify";

export async function registerUserHandler(req: FastifyRequest, rep: FastifyReply){
  rep.send('e');
}