import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { composedAppInjectionContexts } from '../../injections/composedInjectionContexts'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
import { createRouter, createWebHistory } from 'vue-router'
import CharacterManagement from './pages/CharacterManagement.vue'
import TestItemDisplay from './components/TestItemDisplay.vue'
import NotFoundPage from './pages/NotFoundPage.vue'

const appContext = createApp(App);

//Routing setup
const routes = [
	{ path: '/CharacterManagement', component: CharacterManagement },
	{ path: '/Test', component: TestItemDisplay },
	{ path: '/:pathMatch(.*)*', component: NotFoundPage }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export const useGlobalStore = composedAppInjectionContexts.store;
export const useGlobalQueries = composedAppInjectionContexts.queries;


//Any plugins/providers bound to the app context pre-mount
appContext.use(createPinia());
appContext.use(PiniaColada, {});
appContext.use(router);


appContext.mount('#app');
