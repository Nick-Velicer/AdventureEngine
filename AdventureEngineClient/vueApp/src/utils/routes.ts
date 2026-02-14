import type { Component } from "vue";
import CharacterManagement from "../pages/CharacterManagement.vue";
import TableManagement from "../pages/TableManagement.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import Home from "../pages/Home.vue";
import CampaignManagement from "../pages/CampaignManagement.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

type RouteMeta = {
    path: `/${string}`,
    component: Component,
    title: string,
    primaryNavigation: boolean,
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
        primaryNavigation: false
    },
    { 
        path: '/CampaignManagement/:id', 
        component: CampaignManagement,
        title: "Campaign Management",
        primaryNavigation: false
    },
    { 
        path: '/CampaignManagement', 
        component: CampaignManagement,
        title: "Campaign Management",
        primaryNavigation: false
    },
    { 
        path: '/Login', 
        component: Login,
        title: "Login",
        primaryNavigation: false
    },
    { 
        path: '/Register', 
        component: Register,
        title: "Register",
        primaryNavigation: false
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
] as const satisfies Array<RouteMeta>;


//Expecting to take in a pattern match specified in routes above
export function extractRouteBase(urlPattern: string): string {
    return urlPattern.split("/")[1];
}

//Allowing for simpler expression of transition state by transforming i.e.
//"/MyPage/:param" to "MyPage", still using the bases but still
//allowing for pattern matching
export type ExtractRouteBase<T extends typeof routes[number]["path"]> = (
    T extends `/${infer R}${`/${string}`}`? 
        R 
        : 
        T extends `/${infer R}`?
            R
            :
            never
);