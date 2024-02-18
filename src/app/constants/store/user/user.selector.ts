import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/typings/store";

export const selectUser = createSelector(
    (state: AppState) => state.user,
    (userState) => userState.user
);