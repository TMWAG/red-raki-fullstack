import { FastifyInstance } from "fastify";
import userRoutes from "./user/user.routes";
import categoryRoutes from "./category/category.routes";
import productRoutes from "./product/product.routes";

export default async function routes(app: FastifyInstance) {
	app.register(userRoutes, { prefix: "/user" });
	app.register(categoryRoutes, { prefix: "/category" });
	app.register(productRoutes, { prefix: "/product" });
}
