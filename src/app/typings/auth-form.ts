import { FormControl } from "@angular/forms";

export type LoginForm = {
    email: FormControl<string | null>;
    password: FormControl<string | null>;
  }
  