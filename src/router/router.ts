import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReviewView from "../views/ReviewView.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/review', component: ReviewView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
