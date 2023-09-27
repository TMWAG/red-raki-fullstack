import fastifyPlugin from "fastify-plugin"
import { UserRoles } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "../@types";

async function authDecorators(app: FastifyInstance) {
  app.decorate('authenticate', async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (e) {
      rep.code(401).send(e);
    }
  });
  app.decorate('authorizeAdminOrSupervisor', async (req: FastifyRequest, rep: FastifyReply) => {
    const { role } = await req.jwtDecode<JwtPayload>();
    if (role === UserRoles.BUYER) {
      rep.code(403).send('Недостаточно прав');
    }
  });
  app.decorate('authorizeAdmin',async (req: FastifyRequest, rep: FastifyReply) => {
    const { role } = await req.jwtDecode<JwtPayload>();
    if (role !== UserRoles.ADMIN) {
      rep.code(403).send('Необходимы права администратора')
    }
  });
}

export default fastifyPlugin(authDecorators);