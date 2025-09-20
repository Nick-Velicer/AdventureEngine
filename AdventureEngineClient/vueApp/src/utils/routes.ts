import type { Component } from "vue";
import CharacterManagement from "../pages/CharacterManagement.vue"
import TableManagement from "../pages/TableManagement.vue"
import NotFoundPage from "../pages/NotFoundPage.vue";

type RouteMeta = {
    path: `/${string}`,
    component: Component,
    title: string,
    primaryNavigation: boolean
}

export const routes = [
    { 
        path: '/CharacterManagement', 
        component: CharacterManagement,
        title: "Character Management",
        primaryNavigation: true
    },
    { 
        path: '/TableManagement', 
        component: TableManagement,
        title: "Table Management",
        primaryNavigation: true
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: NotFoundPage,
        title: "Not Found",
        primaryNavigation: false
    }
] as const satisfies Array<RouteMeta>