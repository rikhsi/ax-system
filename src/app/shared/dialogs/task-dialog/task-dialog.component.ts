import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormValue, TagType, TaskDialogData, TaskForm } from 'src/app/typings';
import { SvgIconComponent } from '../../components/svg-icon/svg-icon.component';
import { MatButtonModule } from '@angular/material/button';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { MatRadioModule } from '@angular/material/radio';
import { PriorityRadioType } from 'src/app/typings/radio';
import { TAG_NAME } from 'src/app/constants';
import { LabelComponent } from '../../components/label/label.component';
import { SelectComponent } from '../../components/select/select.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import  * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Task } from 'src/app/typings/api/task';

const moment = _rollupMoment || _moment;

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
  disabled: boolean;

  constructor(
    public dialogRef: DialogRef<Task>, 
    @Inject(DIALOG_DATA) public data: TaskDialogData
  ) {}
  
  ngOnInit(): void {
    this.changeMode();
    this.initForm();
    this.initRadioButtons();
  }

  private changeMode(): void {
    this.disabled = this.data.task !== undefined;
  }

  private initForm(): void {
    const data = this.data?.task;

    this.taskForm = new FormGroup<TaskForm>({
      title: new FormControl(data?.title ?? '', [Validators.required]),
      priority: new FormControl(data?.priority ?? '', [Validators.required]),
      performer: new FormControl(data?.performer.id ?? null, [Validators.required]),
      date: new FormControl(moment(data?.date ?? new Date()).format('YYYY-MM-DD')),
      description: new FormControl(data?.description ?? ''),
    });
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

  private buildTask(form: FormValue<TaskForm>): Task {
    return {
      id: null,
      title: form.title,
      description: form.description,
      priority: form.priority as TagType,
      date: form.date,
      performer_id: form.performer
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close();
  }
  
  submit(): void {
    const finalData = this.buildTask(this.taskForm.value);

    this.dialogRef.close(finalData);
  }
}
