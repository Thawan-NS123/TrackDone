import type { Task } from './task-model';

export interface User {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  birthDate: Date;
  gender: string;
  position: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  tasks?: Task[];
}
