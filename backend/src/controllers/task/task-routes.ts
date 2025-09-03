import type { FastifyInstance } from 'fastify';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from './task-controller';

export async function taskRoutes(app: FastifyInstance): Promise<void> {
  app.post('', createTask);
  app.put('/:id', updateTask);
  app.delete('/:id', deleteTask);

  app.get('', getAllTasks);
  app.get('/:id', getTaskById);
}
