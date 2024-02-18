import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ax-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent {

}
