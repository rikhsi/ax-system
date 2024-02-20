import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'ax-textarea',
  standalone: true,
  imports: [
    CommonModule,
    LabelComponent
  ],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() required: boolean;
}
