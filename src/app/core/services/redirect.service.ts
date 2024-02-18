import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROOT_ROUTE } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(private router: Router) { }


  navigateOnLogin(): void {
    this.router.navigate([ROOT_ROUTE.dashboard])
  }

  navigateOnLogout(): void {
    this.router.navigate([ROOT_ROUTE.auth])
  }
}
