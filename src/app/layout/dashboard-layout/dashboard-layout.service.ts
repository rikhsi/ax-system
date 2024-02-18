import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DASHBOARD_ROUTE } from 'src/app/constants';
import { NavItem } from 'src/app/typings';

@Injectable({
  providedIn: 'root'
})
export class DashboardLayoutService {
  #dashboardPages = new BehaviorSubject<NavItem[]>([]);
  dashboardPages$: Observable<NavItem[]> = this.#dashboardPages.asObservable();

  initDashboard(): void {
    const pages: NavItem[] = [
      {
        icon: 'home',
        title: 'Главная страница',
        route: DASHBOARD_ROUTE.main
      },
      {
        icon: 'checked',
        title: 'Управление задачами',
        route: DASHBOARD_ROUTE.tasks
      },
      {
        icon: 'calendar',
        title: 'Календарь',
        route: DASHBOARD_ROUTE.calendar
      },
      {
        icon: 'team',
        title: 'Команда',
        route: DASHBOARD_ROUTE.team
      },
      {
        icon: 'activity',
        title: 'Статистика',
        route: DASHBOARD_ROUTE.statistics
      },
      {
        icon: 'profile',
        title: 'Профиль',
        route: DASHBOARD_ROUTE.profile
      },
      {
        icon: 'settings',
        title: 'Настройки',
        route: DASHBOARD_ROUTE.settings
      }
    ];

    this.#dashboardPages.next(pages);
  }
}
