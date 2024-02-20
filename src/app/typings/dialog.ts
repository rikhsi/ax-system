import { Observable } from "rxjs";
import { SelectOption } from "./select";
import { Task } from "./api/task";

export type TaskDialogData = {
    title: string;
    buttons: boolean;
    options$: Observable<SelectOption[]>;
    task: Task;
}