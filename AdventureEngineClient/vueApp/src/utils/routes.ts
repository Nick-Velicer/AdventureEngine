import type { Component } from "vue";
import CharacterManagement from "../pages/CharacterManagement.vue";
import TableManagement from "../pages/TableManagement.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import Home from "../pages/Home.vue";
import CampaignManagement from "../pages/CampaignManagement.vue";

type RouteMeta = {
    path: `/${string}`,
    component: Component,
    title: string,
    primaryNavigation: boolean
}

export const routes = [
    { 
        path: '/Home', 
        component: Home,
        title: "Home",
        primaryNavigation: true
    },
    { 
        path: '/CharacterManagement/:id', 
        component: CharacterManagement,
        title: "Character Management",
        primaryNavigation: true
    },
    { 
        path: '/CampaignManagement/:id', 
        component: CampaignManagement,
        title: "Campaign Management",
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