import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../label/label.component';
import { MatSelectModule } from '@angular/material/select';
import { SelectOption } from 'src/app/typings';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'ax-select',
  standalone: true,
  imports: [
    CommonModule,
    LabelComponent,
    MatSelectModule,
    SvgIconComponent
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
  @Input() options: SelectOption[];
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() required: boolean;
}
