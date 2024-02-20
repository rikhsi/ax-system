import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { TaskDialogData, TaskForm } from 'src/app/typings';
import { SvgIconComponent } from '../../components/svg-icon/svg-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import {MatRadioModule} from '@angular/material/radio';
import { PriorityRadioType } from 'src/app/typings/radio';
import { TAG_NAME } from 'src/app/constants';
import { LabelComponent } from '../../components/label/label.component';
import { SelectComponent } from '../../components/select/select.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';

@Component({
  selector: 'ax-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule, 
    InputComponent,
    SvgIconComponent,
    MatButtonModule,
    TextareaComponent,
    MatRadioModule,
    LabelComponent,
    SelectComponent,
    ButtonComponent,
    DatePickerComponent,
    ReactiveFormsModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDialogComponent implements OnInit {
  radioButtons: PriorityRadioType[];
  taskForm: FormGroup<TaskForm>;

  constructor(
    public dialogRef: DialogRef<string>, 
    @Inject(DIALOG_DATA) public data: TaskDialogData
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.initRadioButtons();
  }

  private initForm(): void {
    this.taskForm = new FormGroup<TaskForm>({
      title: new FormControl('', [Validators.required]),
      priority: new FormControl(null, [Validators.required]),
      performer: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date().toString()),
      description: new FormControl(''),
    })
  }

  private initRadioButtons(): void {
    this.radioButtons = [
      {
        name: TAG_NAME['low'],
        type: 'low',
        color: 'primary'
      },
      {
        name: TAG_NAME['medium'],
        type: 'medium',
        color: 'accent'
      },
      {
        name: TAG_NAME['high'],
        type: 'high',
        color: 'warn'
      }
    ]
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
