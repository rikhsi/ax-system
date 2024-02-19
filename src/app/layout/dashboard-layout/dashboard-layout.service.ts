import { Injectable, TemplateRef } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardLayoutService {
  #layoutActionRef = new BehaviorSubject<TemplateRef<any>>(null);
  layoutActionRef$: Observable<TemplateRef<any>> = this.#layoutActionRef.asObservable();
  
  set layoutActionRef (el: TemplateRef<any>) {
    this.#layoutActionRef.next(el);
  }

  constructor(private router: Router) {}

  onChangeRoute(): void {
    this.router.events
    .pipe(
      filter(r => r instanceof NavigationStart)
    )
    .subscribe(() => {
      this.#layoutActionRef.next(null);
    })
  }
}
