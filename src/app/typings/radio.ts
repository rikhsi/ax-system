import { TagType } from "./tag";

export type PriorityRadioType = {
    name: string;
    type: TagType;
    color: 'warn' | 'primary' | 'accent';
}