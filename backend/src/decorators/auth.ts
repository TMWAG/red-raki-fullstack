import fastifyPlugin from "fastify-plugin"
import { UserRoles } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "../@types";
import prisma from "../utils/prisma";

async function authDecorators(app: FastifyInstance) {
  app.decorate('authenticate', async (req: FastifyRequest, rep: FastifyReply) => {
    await req.jwtVerify();
    const { id } = await req.jwtDecode<JwtPayload>();
    if (!await prisma.user.findUnique({ where: { id } })){
      return rep.code(404).send('Пользователь не найден')
    }
  });
  app.decorate('authorizeAdminOrSupervisor', async (req: FastifyRequest, rep: FastifyReply) => {
    await req.jwtVerify();
    const { id } = await req.jwtDecode<JwtPayload>();
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return rep.code(404).send('Пользователь не найден');
    }
    if (user.role === UserRoles.BUYER) {
      return rep.code(403).send('Недостаточно прав');
    }
  });
  app.decorate('authorizeAdmin',async (req: FastifyRequest, rep: FastifyReply) => {
    await req.jwtVerify();
    const { id } = await req.jwtDecode<JwtPayload>();
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return rep.code(404).send('Пользователь не найден');
    }
    if (user.role !== UserRoles.ADMIN) {
      return rep.code(403).send('Необходимы права администратора')
    }
  });
}

export default fastifyPlugin(authDecorators);