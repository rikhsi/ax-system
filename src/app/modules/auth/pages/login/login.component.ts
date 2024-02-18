import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { DestroyService, RedirectService, StorageService, ValidationService } from 'src/app/core/services';
import { AuthService } from 'src/app/api/services';
import { filter, of, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'ax-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class LoginComponent implements OnInit {
  isPassword: boolean;

  get loginForm () {
    return this.loginService.loginForm;
  }

  constructor(
    private loginService: LoginService,
    public validationService: ValidationService,
    private authService: AuthService,
    private destroyService: DestroyService,
    private storageService: StorageService,
    private redirectService: RedirectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loginService.initLoginForm();
  }

  toggleVisibilty(): void {
    this.isPassword = !this.isPassword;
  }

  onCheckErrors(controlName: string): string {
    const control = this.loginForm.get(controlName);

    return this.validationService.validateField(control);
  }

  submit(): void {
    this.authService.login(this.loginForm.value)
    .pipe(
      switchMap(user => {
        if (!user) {
          const control = this.loginForm.get('password');
          
          control.setErrors({ not_found: true });
          this.cdr.markForCheck();

          return of(null);
        }
        return of(user);
      }),
      filter(user => user !== null),
      takeUntil(this.destroyService)
    )
    .subscribe(user => {
      if (user) {
        this.storageService.setAccessToken(String(user.id));
        this.redirectService.navigateOnLogin();
      }
    });
  }
}
