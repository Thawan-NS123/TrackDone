export interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  responsible: string | null;
  status: string | null;
  dueDate: Date | null;
  priority: boolean;
  idResponsible: string;
}
