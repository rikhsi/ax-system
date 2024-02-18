import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonMode, SVG_ICONS_TYPE } from 'src/app/typings';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'ax-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    SvgIconComponent
  ]
})
export class ButtonComponent {
  @Input() icon: SVG_ICONS_TYPE;
  @Input() text: string;
  @Input() mode: ButtonMode = 'default';
  @Input() disabled: boolean;
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
