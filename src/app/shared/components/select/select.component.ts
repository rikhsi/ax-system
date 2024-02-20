import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../label/label.component';
import { MatSelectModule } from '@angular/material/select';
import { SelectOption } from 'src/app/typings';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ax-select',
  standalone: true,
  imports: [
    CommonModule,
    LabelComponent,
    MatSelectModule,
    SvgIconComponent,
    FormsModule
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ]
})
export class SelectComponent implements ControlValueAccessor  {
  @Input() options: SelectOption[];
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() required: boolean;
  @Input() value: string
  @Input('ax-disabled') disabled: boolean;

  isOpen: boolean;
  
  onTouched: Function = () => {};
  onChange: Function = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  writeValue(value: string): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  changeVal($event: string): void {
    this.onChange($event.toString().trim());
  }
}
