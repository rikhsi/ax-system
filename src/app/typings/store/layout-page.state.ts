import { ElementRef, TemplateRef } from "@angular/core";
import { NavItem } from "../nav-item"

export type LayoutPageState = {
    pages: NavItem[];
}

export type LayoutActivePageState = {
    page: NavItem
}