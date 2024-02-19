import { createAction, props } from "@ngrx/store";
import { NavItem } from "src/app/typings";

export const layoutInit = createAction('[Layout] Layout init', props<{ pages: NavItem[] }>());
export const layoutActivePage = createAction('[Layout] Layout page has changed', props<{ page: NavItem }>());
