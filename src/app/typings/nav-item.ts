import { DASHBOARD_ROUTE } from "../constants";
import { SVG_ICONS_TYPE } from "./svg-icons";

export type NavItem = {
    title: string;
    icon: SVG_ICONS_TYPE;
    route: DASHBOARD_ROUTE
}