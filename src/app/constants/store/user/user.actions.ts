import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/typings/api';

export const userLoad = createAction('[User] Load User');
export const userSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const userFailure = createAction('[User] Load User Failure', props<{ error: string }>());
export const userLogout = createAction('[User] Logout');

export const performersLoad = createAction('[Performers] Load User');
export const performersLoadSuccess = createAction('[performersLoad] Load Success', props<{ performers: User[] }>());
export const performersLoadFailure = createAction('[performersLoad] Load Failure', props<{ error: string }>());