import { createAction, props } from '@ngrx/store';
import { Task, Tasks } from 'src/app/typings/api/task';

export const taskLoad = createAction('[Task] Load Task', props<{page: number}>());
export const taskSuccess = createAction('[Task] Load Task Success', props<{ tasks: Tasks }>());
export const taskFailure = createAction('[Task] Load Task Failure', props<{ error: string }>());
export const taskRemove = createAction('[Task] Task remove', props<{id: number}>());
export const taskAdd = createAction('[Task] Add Task', props<{ task: Task }>());
