import { FastifyInstance } from "fastify";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "./task-controller";

export async function taskRoutes (app: FastifyInstance) {
    app.post('', createTask)
    app.put('/:id', updateTask)
    app.delete('/:id', deleteTask)

    app.get('/todos', getAllTasks)
    app.get('/:id', getTaskById)
}