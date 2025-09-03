import type { Task } from '../../generated';

import { prismaInstance } from '../prisma';

export class TaskRepository implements TaskMethods {
  public async createTask(body: Task): Promise<Task> {
    return await prismaInstance.task.create({
      data: {
        title: body.title,
        description: body.description,
        responsible: body.responsible,
        status: body.status,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        priority: body.priority ?? false,
        idResponsible: body.idResponsible,
      },
    });
  }

  public async updateTask(body: Task, id: string): Promise<Task> {
    return await prismaInstance.task.update({
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
  }

  public async deleteTask(id: string): Promise<Task> {
    return await prismaInstance.task.delete({
      where: { id },
    });
  }

  public async getTask(id: string): Promise<Task | null> {
    return await prismaInstance.task.findUnique({
      where: { id },
    });
  }

  public async getTasks(where: {
    idResponsible?: string;
    createdAt?: Record<string, Date>;
    status?: Record<string, string>;
  }): Promise<Task[]> {
    return await prismaInstance.task.findMany({ where });
  }
}

export interface TaskMethods {
  createTask(body: Task): Promise<Task>;
  updateTask(body: Task, id: string): Promise<Task>;
  deleteTask(id: string): Promise<Task>;
  getTasks(where: {
    idResponsible?: string;
    createdAt?: Record<string, Date>;
    status?: Record<string, string>;
  }): Promise<Task[]>;
  getTask(id: string): Promise<Task | null>;
}
