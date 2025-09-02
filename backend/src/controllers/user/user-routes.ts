import { FastifyInstance } from "fastify";
import { createUser, getAllUsers, getUserById } from "./user-controller";

export async function userRoutes (app: FastifyInstance) {
    app.post('/cadastrar', createUser)
    app.get('/todos', getAllUsers)
    app.get('/:id', getUserById)
}