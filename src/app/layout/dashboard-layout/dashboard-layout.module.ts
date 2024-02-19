import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SvgIconComponent } from 'src/app/shared/components/svg-icon/svg-icon.component';
import { MatRippleModule } from '@angular/material/core';
import { MenuModule } from 'src/app/shared/directives/menu/menu.module';
import { UserCardComponent } from 'src/app/shared/components/user-card/user-card.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ResizeDirective } from './resize.directive';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HeaderComponent,
    NavigationComponent,
    ResizeDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    SvgIconComponent,
    MatRippleModule,
    MenuModule,
    UserCardComponent,
    NgScrollbarModule,
  
  ]
})
export class DashboardLayoutModule { }
