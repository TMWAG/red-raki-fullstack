import { UserRoles } from "@prisma/client";
import type { MultipartFile, MultipartValue } from "@fastify/multipart";

interface JwtPayload {
  id: string;
  iat: number;
}

interface IProductInput {
  categoryId?: MultipartValue<string>;
  description?: MultipartValue<string>;
  image?: MultipartFile;
  name?: MultipartValue<string>;
  notes?: MultipartValue<string>;
  price?: MultipartValue<number>;
}

interface ICreateProduct {
  categoryId: string;
  description?: string;
  image: MultipartFile;
  name: string;
  notes?: string;
  price: number;
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