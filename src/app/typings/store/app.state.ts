import { User } from "../api";
import { LayoutActivePageState, LayoutPageState } from "./layout-page.state";
import { TaskState } from "./task.state";
import { PerformersState, UserState } from "./user.state";

export type AppState = {
    layoutPages: LayoutPageState;
    layoutActivePage: LayoutActivePageState;
    user: UserState;
    performers: PerformersState;
    task: TaskState;
}