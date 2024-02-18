import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from 'src/app/typings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginForm: FormGroup<LoginForm>;

  initLoginForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }
}

