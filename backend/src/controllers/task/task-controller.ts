import type { FastifyRequest, FastifyReply } from 'fastify';
import { prismaInstance } from '../../prisma';
import type { Task } from '../../models/task-model';

export async function getAllTasks(request: FastifyRequest, reply: FastifyReply): Promise<Task[]> {
  try {
    const { idResponsible, dataInicial, dataFinal } = request.query as any;
    const where: { idResponsible?: string; createdAt?: Record<string, Date> } = {};

    if (idResponsible) {
      where.idResponsible = idResponsible;
    }
    if (dataInicial && dataFinal) {
      where.createdAt = {
        gte: new Date(dataInicial),
        lte: new Date(dataFinal),
      };
    }

    const tasks = await prismaInstance.task.findMany({ where });
    return reply.status(200).send(tasks);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao buscar tarefas.' });
  }
}

export async function getTaskById(request: FastifyRequest, reply: FastifyReply): Promise<Task> {
  const { id } = request.params as { id: string };
  try {
    const task = await prismaInstance.task.findUnique({
      where: { id },
    });

    if (!task) {
      return reply.status(404).send({ error: 'Tarefa não encontrada.' });
    }
    return reply.send(task);
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao buscar tarefa.' });
  }
}

export async function createTask(request: FastifyRequest, reply: FastifyReply): Promise<Task> {
  const body = request.body as any;
  try {
    const task = await prismaInstance.task.create({
      data: {
        title: body.title,
        description: body.description,
        responsible: body.responsible,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        priority: body.priority ?? false,
        idResponsible: body.idResponsible || null,
      },
    });
    return reply.status(201).send(task);
  } catch (error) {
    if (error && (error as any).code === 'P2003') {
      return reply.status(400).send({ error: 'Usuário responsável é obrigatório para criação de tarefa.' });
    }
    return reply.status(500).send({ error: 'Erro ao criar tarefa.' });
  }
}

export async function updateTask(request: FastifyRequest, reply: FastifyReply): Promise<Task> {
  const { id } = request.params as { id: string };
  const body = request.body as any;
  try {
    const task = await prismaInstance.task.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        responsible: body.responsible,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        priority: body.priority,
        idResponsible: body.idResponsible,
      },
    });
    return reply.send(task);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return reply.status(404).send({ error: 'Tarefa não encontrada.' });
    }
    return reply.status(500).send({ error: 'Erro ao editar tarefa.' });
  }
}

export async function deleteTask(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { id } = request.params as { id: string };
  try {
    await prismaInstance.task.delete({
      where: { id },
    });

    return reply.send({ message: 'Tarefa excluída com sucesso.' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return reply.status(404).send({ error: 'Tarefa não encontrada.' });
    }
    return reply.status(500).send({ error: 'Erro ao excluir tarefa.' });
  }
}
