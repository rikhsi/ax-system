import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserQuery } from '../queries';
import { Observable, defaultIfEmpty, filter, from, switchMap } from 'rxjs';
import { User } from 'src/app/typings/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<{users: User[]}>(UserQuery.getById).pipe(
      switchMap(res =>
        from(res.users).pipe(
          filter(user => user.id === id),
          defaultIfEmpty(null)
        )
      )
    )
  }
}
