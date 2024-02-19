import { createReducer, on } from "@ngrx/store";
import { DASHBOARD_ROUTE } from "src/app/constants";
import { LayoutActivePageState, LayoutPageState } from "src/app/typings/store";
import { layoutActivePage, layoutInit } from "./layout-page.actions";

const pagesInitialState: LayoutPageState = {
    pages: [
        {
          icon: 'home',
          title: 'Главная страница',
          route: DASHBOARD_ROUTE.main
        },
        {
          icon: 'checked',
          title: 'Управление задачами',
          route: DASHBOARD_ROUTE.tasks
        },
        {
          icon: 'calendar',
          title: 'Календарь',
          route: DASHBOARD_ROUTE.calendar
        },
        {
          icon: 'team',
          title: 'Команда',
          route: DASHBOARD_ROUTE.team
        },
        {
          icon: 'activity',
          title: 'Статистика',
          route: DASHBOARD_ROUTE.statistics
        },
        {
          icon: 'profile',
          title: 'Профиль',
          route: DASHBOARD_ROUTE.profile
        },
        {
          icon: 'settings',
          title: 'Настройки',
          route: DASHBOARD_ROUTE.settings
        }
      ]
};

const activePageInitialState: LayoutActivePageState = {
  page: null
}

export const layoutPagesReducer = createReducer(
    pagesInitialState,
    on(layoutInit, (state,{ pages }) => ({
      ...state,
      pages
    })),
    on(layoutActivePage, (state, { page }) => ({
        ...state,
        page
    }))
);

export const layoutActivePageReducer = createReducer(
  activePageInitialState,
  on(layoutActivePage, (state, { page }) => ({
      ...state,
      page
  }))
);
