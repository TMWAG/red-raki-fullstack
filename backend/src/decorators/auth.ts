import fastifyPlugin from "fastify-plugin"
import { EmployeeRoles } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "../@types";
import prisma from "../utils/prisma";

async function authDecorators(app: FastifyInstance) {
  app.decorate('authenticate', async (req: FastifyRequest, rep: FastifyReply) => {
    await req.jwtVerify();
    const { id } = await req.jwtDecode<JwtPayload>();
    if (!await prisma.employee.findUnique({ where: { id } })){
      return rep.code(404).send('Пользователь не найден')
    }
  });
  app.decorate('authorizeAdminOrSupervisor', async (req: FastifyRequest, rep: FastifyReply) => {
    await req.jwtVerify();
    const { id } = await req.jwtDecode<JwtPayload>();
    const user = await prisma.employee.findUnique({ where: { id } });
    if (!user) {
      return rep.code(404).send('Пользователь не найден');
    }
  });
  app.decorate('authorizeAdmin',async (req: FastifyRequest, rep: FastifyReply) => {
    await req.jwtVerify();
    const { id } = await req.jwtDecode<JwtPayload>();
    const user = await prisma.employee.findUnique({ where: { id } });
    if (!user) {
      return rep.code(404).send('Пользователь не найден');
    }
    if (user.role !== EmployeeRoles.ADMIN) {
      return rep.code(403).send('Необходимы права администратора')
    }
  });
}

export default fastifyPlugin(authDecorators);