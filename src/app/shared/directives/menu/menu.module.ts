import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDirective } from './menu.directive';
import { MenuItemDirective } from './menu-item.directive';

@NgModule({
  declarations: [
    MenuDirective,
    MenuItemDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuDirective,
    MenuItemDirective
  ]
})
export class MenuModule { }
