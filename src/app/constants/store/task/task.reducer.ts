import { createReducer, on } from '@ngrx/store';
import { TaskState } from 'src/app/typings/store';
import { taskFailure, taskLoad, taskSuccess } from './task.actions';

const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(taskLoad, state => ({
    ...state,
  })),
  on(taskSuccess, (state, {tasks}) => ({
    ...state,
    tasks
  })),
  on(taskFailure, (state) => ({
    ...state,
  }))
);
