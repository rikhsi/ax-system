import { createReducer, on } from '@ngrx/store';
import { PerformersState, UserState } from 'src/app/typings/store';
import { performersLoad, performersLoadFailure, performersLoadSuccess, userFailure, userLoad, userLogout, userSuccess } from './user.actions';
import { User } from 'src/app/typings/api';


const initialState: UserState = {
  user: null
};

const performersInitialState: PerformersState = {
  performers: []
};

export const userReducer = createReducer(
  initialState,
  on(userLoad, state => ({
    ...state,
  })),
  on(userSuccess, (state, {user}) => ({
    ...state,
    user: user
  })),
  on(userFailure, (state) => ({
    ...state,
  })),
  on(userLogout, (state) => ({
    ...state,
    user: null
  }))
);

export const performersReducer = createReducer(
  performersInitialState,
  on(performersLoad, state => ({
    ...state,
  })),
  on(performersLoadSuccess, (state, {performers}) => ({
    ...state,
    performers
  })),
  on(performersLoadFailure, (state) => ({
    ...state,
  }))
);

