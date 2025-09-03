import type { FastifyInstance } from 'fastify';
import {
  authenticateUser,
  createUser,
  getAllUsers,
  getUserById,
  getUserWithMostTasks,
  updateUser,
} from './user-controller';

export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.post('', createUser);
  app.post('/autenticar', authenticateUser);
  app.put('/:id', updateUser);

  app.get('', getAllUsers);
  app.get('/tasks', getUserWithMostTasks);
  app.get('/:id', getUserById);
}
