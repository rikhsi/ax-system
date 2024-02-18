import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/typings/api';

export const userLoad = createAction('[User] Load User');
export const userSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const userFailure = createAction('[User] Load User Failure', props<{ error: string }>());
export const userLogout = createAction('[User] Logout');