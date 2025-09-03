import type { User } from '../models/user-model';
import { prismaInstance } from '../prisma';

export class UserRepository implements UserMethods {
  public async createUser(body: User, passwordHashed: string): Promise<User> {
    return await prismaInstance.user.create({
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
  }

  public async updateUser(body: User, id: string, passwordHashed: string): Promise<User> {
    return await prismaInstance.user.update({
      where: { id },
      data: {
        name: body.name,
        phone: body.phone,
        cpf: body.cpf,
        birthDate: body.birthDate ? new Date(body.birthDate) : undefined,
        gender: body.gender,
        position: body.position,
        email: body.email,
        password: passwordHashed,
      },
    });
  }

  public async deleteUser(id: string): Promise<User> {
    return await prismaInstance.user.delete({
      where: { id },
    });
  }

  public async getUsers(): Promise<User[]> {
    return await prismaInstance.user.findMany({ include: { tasks: true } });
  }

  public async getUserById(id: string): Promise<User | null> {
    return await prismaInstance.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await prismaInstance.user.findUnique({
      where: { email },
    });
  }
}

export interface UserMethods {
  createUser(body: User, passwordHashed: string): Promise<User>;
  updateUser(body: User, id: string, passwordHashed: string): Promise<User>;
  deleteUser(id: string): Promise<User>;
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
}
