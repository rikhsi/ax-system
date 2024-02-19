import { TagType } from "../tag";
import { User } from "./user";

export interface Task {
    id: number;
    priority: TagType;
    date: string;
    performer: User;
    task_name: string;
}