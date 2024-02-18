import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ax-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title: string;
  @Input() user: any;
  
}
