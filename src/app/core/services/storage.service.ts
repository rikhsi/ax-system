import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACCESS_TOKEN_KEY } from 'src/app/constants';
import { userLogout } from 'src/app/constants/store/user';
import { AppState } from 'src/app/typings/store';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor(private store: Store<AppState>){}

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
  }

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  clear() {
    this.store.dispatch(userLogout());
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
