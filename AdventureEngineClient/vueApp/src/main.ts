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
import TableView from './pages/TableManagement.vue'
import { routes } from './utils/routes'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const appContext = createApp(App);

const router = createRouter({
	history: createWebHistory(),
	routes
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(composedAppInjectionContexts.store, import.meta.hot))
}


appContext.use(router);
appContext.use(pinia);
appContext.use(PiniaColada, {});


appContext.mount('#app');
