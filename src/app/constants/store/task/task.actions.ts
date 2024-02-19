import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/typings/api/task';

export const taskLoad = createAction('[Task] Load Task', props<{page: number}>());
export const taskSuccess = createAction('[Task] Load Task Success', props<{ tasks: Task[] }>());
export const taskFailure = createAction('[Task] Load Task Failure', props<{ error: string }>());
