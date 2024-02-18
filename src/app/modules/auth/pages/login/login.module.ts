import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ImageDirective } from 'src/app/shared/directives/image.directive';
import {MatInputModule} from '@angular/material/input';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    ImageDirective,
    MatInputModule,
    SvgIconComponent
  ]
})
export class LoginModule { }
