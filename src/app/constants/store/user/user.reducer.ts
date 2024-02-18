import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from 'src/app/typings/store';


export const initialState: UserState = {
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({
    ...state,
  })),
  on(UserActions.loadUserSuccess, (state) => ({
    ...state,
  })),
  on(UserActions.loadUserFailure, (state) => ({
    ...state,
  }))
);
