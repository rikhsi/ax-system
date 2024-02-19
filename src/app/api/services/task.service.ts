import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, filter, from, map, skip, switchMap, take, toArray } from 'rxjs';
import { TaskQuery } from '../queries/task';
import { Task, Tasks } from 'src/app/typings/api/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTaskList(offset: number, limit: number, skipItems: number[]): Observable<Tasks> {
    return this.http.get<{tasks: Task[]}>(TaskQuery.getList)
    .pipe(
      delay(100),
      switchMap(list => from(list.tasks)
        .pipe(
          filter(task => !skipItems.includes(task.id)),
          skip(offset), 
          take(limit), 
          toArray(),
          map(filteredArr => ({list: filteredArr, total: list.tasks.length - skipItems.length}),
      ))),
    );
  }
}
