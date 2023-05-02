import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/font.css'
import './assets/css/style.css'
import App from './App.vue'
import router from "./router/router.ts";
import Popper from "vue3-popper";

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.component("Popper", Popper);
app.mount('#app')
