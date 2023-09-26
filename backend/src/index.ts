import fastify from "fastify";
import userRoutes from "./modules/user/user.routes";

const app = fastify({
  logger: true,
});

app.register(userRoutes, {prefix: '/user'})

app.listen({
  port: 3001,
  host: "0.0.0.0"
}, (err, address) => {
  if(err){
    app.log.error(err);
    process.exit(1);
  }
  console.log(`server is listening on ${address}`);
});