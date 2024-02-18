import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DASHBOARD_ROUTE, ROOT_ROUTE } from './constants';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: ROOT_ROUTE.auth,
    component: AuthLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: ROOT_ROUTE.dashboard,
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: DASHBOARD_ROUTE.main,
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
      },
      {
        path: DASHBOARD_ROUTE.tasks,
        loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: DASHBOARD_ROUTE.calendar,
        loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: DASHBOARD_ROUTE.team,
        loadChildren: () => import('./modules/team/team.module').then(m => m.TeamModule)
      },
      {
        path: DASHBOARD_ROUTE.statistics,
        loadChildren: () => import('./modules/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: DASHBOARD_ROUTE.profile,
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: DASHBOARD_ROUTE.settings,
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: '**',
        redirectTo: DASHBOARD_ROUTE.main
      }
    ]
  },
  {
    path: '**',
    redirectTo: ROOT_ROUTE.auth
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
