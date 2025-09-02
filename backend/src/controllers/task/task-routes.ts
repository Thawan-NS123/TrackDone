import { FastifyInstance } from "fastify";
import { createTask, getAllTasks, getTaskById, updateTask } from "./task-controller";

export async function taskRoutes (app: FastifyInstance) {
    app.post('/cadastrar', createTask)
    app.put('/:id', updateTask)

    app.get('/todos', getAllTasks)
    app.get('/:id', getTaskById)
}