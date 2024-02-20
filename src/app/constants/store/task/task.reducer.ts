import { createReducer, on } from '@ngrx/store';
import { TaskState } from 'src/app/typings/store';
import { taskAdd, taskFailure, taskLoad, taskRemove, taskSuccess } from './task.actions';

const taskInitialState: TaskState = {
  tasks: {
    list: [],
    total: 0
  }
};

export const taskReducer = createReducer(
  taskInitialState,
  on(taskLoad, state => ({
    ...state,
  })),
  on(taskSuccess, (state, { tasks }) => ({
    ...state,
    tasks
  })),
  on(taskFailure, (state) => ({
    ...state,
  })),
  on(taskRemove, (state, {id}) => ({
    ...state,
    tasks: {
      ...state.tasks,
      list: state.tasks.list.filter(task => task.id !== id)
    }
  })),
  on(taskAdd, (state, { task }) => ({
    ...state,
    tasks: {
      ...state.tasks,
      list: [task,...state.tasks.list],
      total: state.tasks.total + 1
    }
  }))
);
