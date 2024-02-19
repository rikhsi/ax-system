import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, skip, switchMap, take, toArray } from 'rxjs';
import { TaskQuery } from '../queries/task';
import { Task } from 'src/app/typings/api/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTaskList(offset: number, limit: number): Observable<Task[]> {
    return this.http.get<{tasks: Task[]}>(TaskQuery.getList).pipe(
      switchMap(v => from(v.tasks).pipe(skip(offset), take(limit), toArray()))
    );
  }
}
