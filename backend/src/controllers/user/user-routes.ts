import type { FastifyInstance } from 'fastify';
import { authenticateUser, createUser, getAllUsers, getUserById, updateUser } from './user-controller';

export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.post('/cadastrar', createUser);
  app.post('/autenticar', authenticateUser);

  app.put('/:id', updateUser);
  app.get('/todos', getAllUsers);
  app.get('/:id', getUserById);
}
