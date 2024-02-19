import { User } from "./user";

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: number;
    priority: TaskPriority;
    date: string;
    performer: User;
    task_name: string;
}