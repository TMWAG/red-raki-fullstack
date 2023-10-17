import { UserRoles } from "@prisma/client";
import type { MultipartFile, MultipartValue } from "@fastify/multipart";

interface JwtPayload {
  id: string;
  iat: number;
}

interface IProductInput {
  name?: MultipartValue<string>;
  description?: MultipartValue<string>;
  categoryId?: MultipartValue<string>;
  price?: MultipartValue<number>;
  image?: MultipartFile;
}

interface ICategoryInput {
  name?: MultipartValue<string>;
  image?: MultipartFile;
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