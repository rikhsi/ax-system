import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/typings/store";

export const selectTask = createSelector(
    (state: AppState) => state.task,
    (taskState) => taskState.tasks
);