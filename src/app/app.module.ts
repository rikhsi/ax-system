import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutModule } from './layout/dashboard-layout/dashboard-layout.module';
import { AuthLayoutModule } from './layout/auth-layout/auth-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreInterceptor } from './core/interceptors/core.interceptor';
import { StoreModule } from '@ngrx/store';
import { AppState } from './typings/store';
import { performersReducer, userReducer } from './constants/store/user';
import { layoutActivePageReducer, layoutPagesReducer } from './constants/store/layout-page';
import { taskReducer } from './constants/store/task/task.reducer';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import 'moment/locale/ru';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthLayoutModule,
    DashboardLayoutModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>({
      layoutPages: layoutPagesReducer,
      layoutActivePage: layoutActivePageReducer,
      user: userReducer,
      performers: performersReducer,
      task: taskReducer
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
