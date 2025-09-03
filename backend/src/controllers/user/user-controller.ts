/* Interfaces */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { User } from '../../models/user-model';
import type { Task } from '../../../generated';
/* Services */
import { hashPassword, verifyPassword } from '../../utils/utils.service';
import { type UserMethods, UserRepository } from '../../repositories/user-repositories';

const userService: UserMethods = new UserRepository();

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply): Promise<User[]> {
  try {
    const users = await userService.getUsers();

    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
    return reply.send(usersWithoutPassword);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao buscar usuários.', errorMessage: error });
  }
}

export async function getUserWithMostTasks(request: FastifyRequest, reply: FastifyReply): Promise<any> {
  try {
    const users = await userService.getUsers();

    const usersTasks: { name: string; id: string; taskCount: number; tasks: Task[] } = users.reduce(
      (acc: any, user) => {
        acc.push({ name: user.name, id: user.id, taskCount: user.tasks?.length, tasks: user.tasks });
        return acc;
      },
      [],
    );

    reply.send(usersTasks);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao buscar usuários.', errorMessage: error });
  }
}

export async function getUserById(request: FastifyRequest, reply: FastifyReply): Promise<User> {
  const { id } = request.params as { id: string };

  try {
    const user = await userService.getUserById(id);

    if (!user) {
      return reply.status(404).send({ error: 'Usuário não encontrado.' });
    }

    return reply.send(user);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao buscar usuário.', errorMessage: error });
  }
}

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<User | { error: string }> {
  const { email, password } = request.body as User;
  if (!email || !password) {
    return reply.status(400).send({ error: 'Email e senha são obrigatórios.' });
  }

  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return reply.status(401).send({ error: 'Erro ao autenticar usuário' });
    }

    const isPasswordValid: boolean = await verifyPassword(password, user.password);
    if (!isPasswordValid) return reply.status(401).send({ error: 'Authentication failed, user not valid.' });

    const { password: bodyPassword, ...userWithoutPassword } = user;
    return reply.status(200).send(userWithoutPassword);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao autenticar usuário.', errorMessage: error });
  }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
  const body = request.body as User;
  try {
    const passwordHashed: string = await hashPassword(body.password);
    const user = await userService.createUser(body, passwordHashed);
    const { password, ...userWithoutPassword } = user;

    return reply.status(201).send(userWithoutPassword);
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Código de erro do prisma que indica violação de PK já cadastrada
      return reply.status(409).send({ error: 'Email ou CPF já cadastrados.' });
    }
    return reply.status(500).send({ error: error });
  }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
  const { id } = request.params as { id: string };
  const body = request.body as any;

  try {
    const passwordHashed: string = await hashPassword(body.password);
    const user = await userService.updateUser(body, id, passwordHashed);

    const { password, ...userWithoutPassword } = user;
    return reply.send(userWithoutPassword);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return reply.status(404).send({ error: 'Usuário não encontrado.' });
    }
    if (error.code === 'P2002') {
      return reply.status(409).send({ error: 'CPF já cadastrado.' });
    }
    return reply.status(500).send({ error: 'Erro ao atualizar usuário.' });
  }
}
