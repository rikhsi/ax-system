import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, debounceTime, map, switchMap, takeUntil, tap } from 'rxjs';
import { TaskService } from 'src/app/api/services';
import { TaskTable } from 'src/app/constants';
import { selectTask, taskFailure, taskLoad, taskSuccess } from 'src/app/constants/store/task';
import { DestroyService } from 'src/app/core/services';
import { Task } from 'src/app/typings/api/task';
import { AppState } from 'src/app/typings/store';

@Component({
  selector: 'ax-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class TasksComponent implements OnInit {
  tableData$: Observable<Task[]> = this.store.pipe(select(selectTask));
  limit: number = 9;
  headers: TaskTable[] = [
    TaskTable.date, 
    TaskTable.performer, 
    TaskTable.priority, 
    TaskTable.task_name, 
    TaskTable.action
  ];

  private currentPage$ = new Subject<number>();

  constructor(
    private taskService: TaskService, 
    private destroy: DestroyService,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.getTableData();
    this.onChangePage();
  }

  private getTableData(): void {    
    this.currentPage$
    .pipe(
      debounceTime(300),
      tap(page => this.store.dispatch(taskLoad({ page }))),
      switchMap(page => this.taskService.getTaskList(page * this.limit, this.limit)),
      map(tasks => {
        if (tasks) {
          return taskSuccess({ tasks });
        } 

        return taskFailure({ error: 'error' });
      }),
      takeUntil(this.destroy)
    )
    .subscribe((action) => {
      this.store.dispatch(action)
    })
  }

  onChangePage(index: number = 0): void {
    this.currentPage$.next(index);
  }

}
