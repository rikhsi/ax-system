import { Injectable } from '@angular/core';
import { ACCESS_TOKEN_KEY } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
  }

  setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  clear() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
