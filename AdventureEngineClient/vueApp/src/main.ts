import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'


const appContext = createApp(App);

//Any additional plugins/providers should be added here before mounting
appContext.use(createPinia());
appContext.use(PiniaColada, {});

appContext.mount('#app');
