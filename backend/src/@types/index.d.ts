import { UserRoles } from "@prisma/client";

export interface JwtPayload {
  phone: string;
  role: UserRoles; 
}

declare module "fastify" {
  export interface FastifyInstance {
    /**
     * verifies jwt token
     */
    authenticate: (req: FastifyRequest, rep: FastifyReply) => Promise<void>;
    /**
     * allows only admins & supervisors
     */
    authorizeAdminOrSupervisor: (req: FastifyRequest, rep: FastifyReply) => Promise<void>;
    /**
     * allows only admins
     */
    authorizeAdmin: (req: FastifyRequest, rep: FastifyReply) => Promise<void>;
  }
} 