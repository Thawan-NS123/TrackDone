/* Interfaces */
import type { FastifyRequest, FastifyReply } from 'fastify';
import type { User } from '../../models/user-model';
import type { Task } from '../../../generated';
/* Services */
import { prismaInstance } from '../../prisma';
import { hashPassword, verifyPassword } from '../../utils/utils.service';

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply): Promise<User[]> {
  try {
    const users = await prismaInstance.user.findMany({ include: { tasks: true } });

    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
    return reply.send(usersWithoutPassword);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao buscar usuários.', errorMessage: error });
  }
}

export async function getUserWithMostTasks(request: FastifyRequest, reply: FastifyReply): Promise<any> {
  try {
    const users = await prismaInstance.user.findMany({ include: { tasks: true } });

    const usersTasks: { name: string; id: string; taskCount: number; tasks: Task[] } = users.reduce(
      (acc: any, user) => {
        acc.push({ name: user.name, id: user.id, taskCount: user.tasks.length, tasks: user.tasks });
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
    const user = await prismaInstance.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
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
    const user = await prismaInstance.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply.status(401).send({ error: 'Erro ao autenticar usuário' });
    }

    const isPasswordValid: boolean = await verifyPassword(password, user.password);
    if (!isPasswordValid) return reply.status(401).send({ error: 'Authentication failed, user not valid.' });
    return reply.status(200).send(user);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao autenticar usuário.', errorMessage: error });
  }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
  const body = request.body as User;
  try {
    const passwordHashed: string = await hashPassword(body.password);
    const user = await prismaInstance.user.create({
      data: {
        name: body.name,
        phone: body.phone,
        cpf: body.cpf,
        birthDate: new Date(body.birthDate),
        gender: body.gender,
        position: body.position,
        email: body.email,
        password: passwordHashed,
      },
    });
    const { password, ...userWithoutPassword } = user;

    return reply.status(201).send(userWithoutPassword);
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Código de erro do prisma que indica violação de PK já cadastrada
      return reply.status(409).send({ error: 'CPF já cadastrado.' });
    }
    return reply.status(500).send({ error: error });
  }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply): Promise<User> {
  const { id } = request.params as { id: string };
  const body = request.body as any;

  try {
    const user = await prismaInstance.user.update({
      where: { id },
      data: {
        name: body.name,
        phone: body.phone,
        cpf: body.cpf,
        birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
        gender: body.gender,
        position: body.position,
        email: body.email,
        password: body.password,
      },
    });
    return reply.send(user);
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
