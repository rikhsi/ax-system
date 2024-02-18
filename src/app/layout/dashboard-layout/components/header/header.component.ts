import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from 'src/app/typings/api';

@Component({
  selector: 'ax-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title: string;
  @Input() user: User;  
}
