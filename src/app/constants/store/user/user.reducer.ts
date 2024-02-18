import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from 'src/app/typings/store';


export const initialState: UserState = {
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userLoad, state => ({
    ...state,
  })),
  on(UserActions.userSuccess, (state, {user}) => ({
    ...state,
    user: user
  })),
  on(UserActions.userFailure, (state) => ({
    ...state,
  })),
  on(UserActions.userLogout, (state) => ({
    ...state,
    user: null
  }))
);
