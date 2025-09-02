import fastify from "fastify";
import { userRoutes } from "./controllers/user/user-routes";
import { taskRoutes } from "./controllers/task/task-routes";

const server = fastify();
server.register(userRoutes, { prefix: "/user",});
server.register(taskRoutes, { prefix: "/task",});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
