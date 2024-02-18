import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { MatRippleModule } from '@angular/material/core';
import { MenuModule } from 'src/app/shared/directives/menu/menu.module';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SvgIconComponent,
    MatRippleModule,
    MenuModule
  ]
})
export class DashboardLayoutModule { }
