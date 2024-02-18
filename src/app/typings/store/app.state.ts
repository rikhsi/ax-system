import { LayoutActivePageState, LayoutPageState } from "./layout-page.state";
import { UserState } from "./user.state";

export interface AppState {
    layoutPages: LayoutPageState;
    layoutActivePage: LayoutActivePageState,
    user: UserState;
}