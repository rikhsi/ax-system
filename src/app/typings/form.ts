import { FormControl } from "@angular/forms";
import { User } from "./api";

export type FormValue<T> = {
    [K in keyof T]?: T[K] extends FormControl<infer U> ? U : never;
};

export type TaskForm = {
    date: FormControl<string | null>;
    title: FormControl<string | null>;
    description: FormControl<string | null>;
    priority: FormControl<string> | null;
    performer: FormControl<User> | null;
};