import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ax-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class InputComponent {

}
