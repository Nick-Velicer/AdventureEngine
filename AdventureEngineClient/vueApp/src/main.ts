import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'

import CharacterManagement from './pages/CharacterManagement.vue'
import TestItemDisplay from './components/TestItemDisplay.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import { acceptHMRUpdate, createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
import { createRouter, createWebHistory } from 'vue-router'
import { composedAppInjectionContexts } from '../../injections/composedInjectionContexts'

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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(composedAppInjectionContexts.store, import.meta.hot))
}


appContext.use(router);
appContext.use(createPinia());
appContext.use(PiniaColada, {});


appContext.mount('#app');
