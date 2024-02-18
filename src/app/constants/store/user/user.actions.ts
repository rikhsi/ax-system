import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/typings/api';

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: string }>());