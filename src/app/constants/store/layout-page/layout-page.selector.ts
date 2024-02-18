import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/typings/store";

export const selectLayoutPages = createSelector(
    (state: AppState) => state.layoutPages,
    (layoutPages) =>  layoutPages.pages
);

export const selectLayoutActivePage = createSelector(
    (state: AppState) => state.layoutActivePage,
    (layoutPages) =>  layoutPages.page
);


