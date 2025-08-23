import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia, defineStore } from 'pinia'
import { defineQuery, PiniaColada } from '@pinia/colada'
import { createMemoryHistory, createRouter } from 'vue-router'
import CharacterManagement from './pages/CharacterManagement.vue'
import TestItemDisplay from './components/TestItemDisplay.vue'
import { composeStateConfig } from '../../state/ClientStateConfig'
import { getCharacterbyId, getCharacters, saveCharacter } from '../../services/generated/CharacterService'
import NotFoundPage from './pages/NotFoundPage.vue'

const appContext = createApp(App);

//Any plugins/providers bound to the app context pre-mount
appContext.use(createPinia());
appContext.use(PiniaColada, {});

const stateConfig = composeStateConfig(
	defineQuery, 
	{
		getItemById: getCharacterbyId,
		getAllItems: getCharacters,
		saveItem: saveCharacter
	}
)

export const useGlobalStore = defineStore('globalStore', {
	state: () => stateConfig.default, 
	getters: stateConfig.getters,
	actions: stateConfig.actions
})


const routes = [
	{ path: '/CharacterManagement', component: CharacterManagement },
	{ path: '/Test', component: TestItemDisplay },
	{ path: '/:pathMatch(.*)*', component: NotFoundPage }
]

const router = createRouter({
	history: createMemoryHistory(),
	routes,
})

appContext.use(router);


appContext.mount('#app');
