import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DashboardLayoutService } from './dashboard-layout.service';
import { Observable, filter, from, of, switchMap, take, takeUntil } from 'rxjs';
import { NavItem } from 'src/app/typings';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH_ROUTE, ROOT_ROUTE } from 'src/app/constants';
import { DestroyService, RedirectService, StorageService } from 'src/app/core/services';
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'ax-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class DashboardLayoutComponent implements OnInit {
  dashboardPages$: Observable<NavItem[]>;
  currentPage: NavItem;

  constructor(
    private dashboardLayoutService: DashboardLayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private destroy: DestroyService,
    private storageService: StorageService,
    private userService: UserService,
    private redirectService: RedirectService
  ){} 

  ngOnInit(): void {
    this.dashboardPages$ = this.dashboardLayoutService.dashboardPages$;

    this.dashboardLayoutService.initDashboard();
    this.defineRoute();
    this.onGetUser();
  }  

  private onGetUser(): void {
    const token = this.storageService.getAccessToken() as string;

    this.userService.getUserById(+token)
    .pipe(
      switchMap(user => {
        if(!user) {
          this.storageService.clear();
          this.redirectService.navigateOnLogout();

          return of(null)
        }

        return of(user)
      }),
      takeUntil(this.destroy)
    )
    .subscribe({
      next: user => {

      }
    })
  }

  private defineRoute(): void {
    const children = this.route.snapshot.root.firstChild.children;
    const url = children[0].url[0].path;

    this.dashboardPages$
    .pipe(
      take(1),
      switchMap(p => from(p)
        .pipe(
          filter(item => item.route === url)
        )),
      takeUntil(this.destroy)
    )
    .subscribe(item => {
      this.currentPage = item;
    });
  }

  onChangeCurrentPage(item: NavItem): void {
    this.currentPage = item;

    this.router.navigate([item.route], {relativeTo: this.route});
  }

  logout(): void {
    this.storageService.clear();
    
    this.router.navigate([ROOT_ROUTE.auth, AUTH_ROUTE.login]);
  }
}
