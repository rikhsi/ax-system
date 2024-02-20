import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, debounceTime, from, map, switchMap, takeUntil, tap, toArray } from 'rxjs';
import { TaskService, UserService } from 'src/app/api/services';
import { TaskTable } from 'src/app/constants';
import { selectTask, selectTaskTotal, taskFailure, taskLoad, taskRemove, taskSuccess } from 'src/app/constants/store/task';
import { DestroyService } from 'src/app/core/services';
import { DashboardLayoutService } from 'src/app/layout/dashboard-layout/dashboard-layout.service';
import { TrackBy } from 'src/app/shared/utils';
import { FilterItem } from 'src/app/typings';
import { Task } from 'src/app/typings/api/task';
import { AppState } from 'src/app/typings/store';
import { TaskDialogComponent } from 'src/app/shared/dialogs/task-dialog/task-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { User } from 'src/app/typings/api';
import { performersLoadFailure, performersLoadSuccess, selectPerformers } from 'src/app/constants/store/user';

@Component({
  selector: 'ax-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService, Dialog]
})
export class TasksComponent extends TrackBy implements OnInit, AfterViewInit {
  tableData$: Observable<Task[]> = this.store.pipe(select(selectTask));
  total$: Observable<number> = this.store.pipe(select(selectTaskTotal));
  performers$: Observable<User[]> = this.store.pipe(select(selectPerformers));
  limit: number = 10;
  filters: FilterItem[] = [];
  currentFilter: FilterItem;
  headers: TaskTable[] = [
    TaskTable.date, 
    TaskTable.performer, 
    TaskTable.priority, 
    TaskTable.task_name, 
    TaskTable.action
  ];

  private removedItems = new Set<number>();
  private currentPage$ = new BehaviorSubject<number>(0);

  @ViewChild('actionRef') action: TemplateRef<any>;

  constructor(
    private taskService: TaskService, 
    private destroy: DestroyService,
    private store: Store<AppState>,
    private dashboardLayoutService: DashboardLayoutService,
    private cdr: ChangeDetectorRef,
    private dialog: Dialog,
    private userService: UserService
  ){
    super();
  }

  ngOnInit(): void {
    this.initFilters();
    this.getTableData();
    this.getPerformers();
  }

  ngAfterViewInit(): void {
    this.dashboardLayoutService.layoutActionRef = this.action;
  }

  private getPerformers(): void {
    this.userService.getAllUsers()
    .pipe(
      map(performers => {
        if (performers) {
          return performersLoadSuccess({ performers });
        } 

        return performersLoadFailure({ error: 'error' });
      }),
      takeUntil(this.destroy)
    )
    .subscribe({
      next: action => {
        this.store.dispatch(action);
      }
    })
  }

  private initFilters(): void {
    this.filters = [
      {
        name: 'Не выбрано',
        type: 'none'
      },
      {
        name: 'Дата',
        type: 'date'
      }
    ]
  }

  private getTableData(): void {    
    this.currentPage$
    .pipe(
      debounceTime(100),
      tap(page => this.store.dispatch(taskLoad({ page }))),
      switchMap(page => {
        const offset = page * this.limit;

        return this.taskService.getTaskList(offset, this.limit, [...this.removedItems])
      }),
      map(tasks => {
        if (tasks) {
          return taskSuccess({ tasks });
        } 

        return taskFailure({ error: 'error' });
      }),
      takeUntil(this.destroy)
    )
    .subscribe((action) => {
      this.store.dispatch(action);
    })
  }

  onSelectFilter(item: FilterItem): void {
    this.currentFilter = item;

    this.cdr.markForCheck();
  }

  onChangePage(index: number = 0): void {
    this.currentPage$.next(index);
  }

  onRemoveTask(id: number): void {
    const currentPage = this.currentPage$.getValue();

    this.store.dispatch(taskRemove({id}));
    this.removedItems.add(id);
    this.currentPage$.next(currentPage);
  }

  openDialog(type: 'create' | 'view'): void {
    const title = type === 'create' ? 'Создание новой задачи' : 'Просмотр задачи';
    const buttons = type === 'create';
    const options$ = this.performers$.pipe(
        switchMap(users => {
          return from(users).pipe(map(v => ({id: v.id, name: v.displayName})),toArray())
        })
    );
    
    this.dialog.open<string>(
      TaskDialogComponent,
      {
        autoFocus: false,
        disableClose: true,
        data: { title, buttons, options$ }
      }
    ).closed;
  }

}
