import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { TagComponent } from 'src/app/shared/components/tag/tag.component';
import { UserCardComponent } from 'src/app/shared/components/user-card/user-card.component';


@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    TableComponent,
    ButtonComponent,
    TagComponent,
    UserCardComponent
  ]
})
export class TasksModule { }
