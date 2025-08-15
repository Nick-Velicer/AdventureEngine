import { defineStore } from 'pinia'
import { stateDefault } from './ClientStateConfig'

export const useGlobalStore = defineStore('globalStore', {
	state: () => (stateDefault),
    getters: {
      	doubleCount: (state) => state.count * 2,
    },
    actions: {
      	increment() {
        	this.count++
      	},
    },
})