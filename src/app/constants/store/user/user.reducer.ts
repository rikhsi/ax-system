import { createReducer, on } from '@ngrx/store';
import { UserState } from 'src/app/typings/store';
import { userFailure, userLoad, userLogout, userSuccess } from './user.actions';


const initialState: UserState = {
  user: null
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
