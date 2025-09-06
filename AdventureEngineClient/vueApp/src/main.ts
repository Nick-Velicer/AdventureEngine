import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import CharacterManagement from './pages/CharacterManagement.vue'
import TestItemDisplay from './components/TestItemDisplay.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
import { createRouter, createWebHistory } from 'vue-router'

const appContext = createApp(App);

appContext.use(createPinia());
appContext.use(PiniaColada, {});

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


appContext.use(router);


appContext.mount('#app');
