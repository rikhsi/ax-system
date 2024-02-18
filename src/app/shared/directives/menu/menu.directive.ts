import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { MenuItemDirective } from './menu-item.directive';
import { DestroyService } from 'src/app/core/services';
import { takeUntil } from 'rxjs';

@Directive({
  selector: '[ax-menu]',
  providers: [DestroyService]
})
export class MenuDirective implements AfterViewInit{
  @ContentChildren(MenuItemDirective) menuItems: QueryList<MenuItemDirective>;

  constructor( private destroy: DestroyService){}

  ngAfterViewInit() {
    this.initListener();
  }

  private initListener(): void {
    this.menuItems.forEach((item, index) => {
      item.clicked
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.setActiveItem(index);
      });
    });
  }
  
  private setActiveItem(index: number): void {
    this.menuItems.forEach((item, i) => {
      if (i === index) {
        item.onAddActive();
      } else {
        item.onClearActive();
      }
    });
  }
}
