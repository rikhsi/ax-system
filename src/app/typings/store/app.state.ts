import { LayoutActivePageState, LayoutPageState } from "./layout-page.state";
import { TaskState } from "./task.state";
import { UserState } from "./user.state";

export type AppState = {
    layoutPages: LayoutPageState;
    layoutActivePage: LayoutActivePageState;
    user: UserState;
    task: TaskState;
}