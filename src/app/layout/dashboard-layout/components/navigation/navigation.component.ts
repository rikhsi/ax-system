import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DASHBOARD_ROUTE } from 'src/app/constants';
import { NavItem } from 'src/app/typings';

@Component({
  selector: 'ax-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() pages: NavItem[];
  @Input() currentPage: NavItem;
  
  @Output() selectedPage = new EventEmitter<NavItem>();
  @Output() logoutClick = new EventEmitter<void>();

  onNavigate(item?: NavItem): void {
    if(!item) {
      item = this.pages.find(m => m.route === DASHBOARD_ROUTE.main);
    }
 
    this.selectedPage.emit(item);
  }  

  onLogout(): void {
    this.logoutClick.emit();
  }
}
