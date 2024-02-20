import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ax-logout-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutDialogComponent {

}
