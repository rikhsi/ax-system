import { Observable } from "rxjs";
import { SelectOption } from "./select";

export type TaskDialogData = {
    title: string;
    buttons: boolean;
    options$: Observable<SelectOption[]>;
}