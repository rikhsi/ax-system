import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, debounceTime, filter, from, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { NavItem } from 'src/app/typings';
import { ActivatedRoute, Router } from '@angular/router';
import { AUTH_ROUTE, ROOT_ROUTE } from 'src/app/constants';
import { DestroyService, RedirectService, StorageService } from 'src/app/core/services';
import { UserService } from 'src/app/api/services';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/typings/store';
import { userLoad, userFailure, userSuccess, selectUser } from 'src/app/constants/store/user';
import { User } from 'src/app/typings/api';
import { selectLayoutPages, selectLayoutActivePage, layoutActivePage  } from 'src/app/constants/store/layout-page';
import { ResizeDirective } from './resize.directive';
import { DashboardLayoutService } from './dashboard-layout.service';


@Component({
  selector: 'ax-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit {
  dashboardPages$: Observable<NavItem[]> = this.store.pipe(select(selectLayoutPages));
  user$: Observable<User> = this.store.pipe(select(selectUser));
  currentPage$: Observable<NavItem> = this.store.pipe(select(selectLayoutActivePage));
  headerHeight: string;

  @ViewChild(ResizeDirective) resizeDirective: ResizeDirective;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private destroy: DestroyService,
    private storageService: StorageService,
    private userService: UserService,
    private redirectService: RedirectService,
    private store: Store<AppState>,
    private dashboardLayoutService: DashboardLayoutService
  ){} 

  ngOnInit(): void {
    this.dashboardLayoutService.onChangeRoute();
    this.defineRoute();
    this.onGetUser();
  }  

  ngAfterViewInit(): void {
    this.onListenHeaderContent();
    this.onListenAction();
  }

  private onListenAction(): void {
    this.dashboardLayoutService.layoutActionRef$
    .pipe(
      tap(() => this.container?.clear()),
      filter(el => el !== null),
      takeUntil(this.destroy)
    )
    .subscribe((el) => {
      this.container.createEmbeddedView(el);
    })
  }

  private onGetUser(): void {
    const token = this.storageService.getAccessToken() as string;

    this.store.dispatch(userLoad()); 

    this.userService.getUserById(+token).pipe(
      switchMap(user => {
        if (!user) {
          this.storageService.clear();
          this.redirectService.navigateOnLogout();
          return of(null);
        }
        return of(user);
      }),
      map(user => {
        if (user) {
          return userSuccess({ user });
        } 

        return userFailure({ error: 'User not found' });
      }),
      takeUntil(this.destroy)
    ).subscribe(action => {
      this.store.dispatch(action);
    });
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
    .subscribe(page => {
      this.store.dispatch(layoutActivePage({page}));
    });
  }

  private onListenHeaderContent(): void {
    this.resizeDirective.resize
    .pipe(
      debounceTime(100),
      takeUntil(this.destroy)
    )
    .subscribe((rect: DOMRectReadOnly) => {
      this.headerHeight = `calc(100svh - ${rect.height}px)`;
    });
  }

  onChangeCurrentPage(page: NavItem): void {

    this.store.dispatch(layoutActivePage({page}));

    this.router.navigate([page.route], {relativeTo: this.route});
  }

  logout(): void {
    this.storageService.clear();
    
    this.router.navigate([ROOT_ROUTE.auth, AUTH_ROUTE.login]);
  }
}
