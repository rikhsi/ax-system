import { TagType } from "../tag";
import { User } from "./user";

export interface Tasks {
    list: Task[];
    total: number;
}

export interface Task {
    id: number;
    priority: TagType;
    date: string;
    performer: User;
    title: string;
    description: string;
}