import { Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, filter, from, switchMap} from 'rxjs';
import { AuthQuery } from '../queries';
import { FormValue, LoginForm } from 'src/app/typings';
import { User } from 'src/app/typings/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  
  login(value: FormValue<LoginForm>): Observable<User> {
    return this.http.get<{ users: User[] }>(AuthQuery.login).pipe(
      switchMap(res =>
        from(res.users).pipe(
          filter(user => user.email === value.email && user.password === value.password),
          defaultIfEmpty(null)
        )
      )
    );
  }
}
