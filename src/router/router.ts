import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";

const ReviewView = () => import('../views/ReviewView.vue');
const TermsView = () => import('../views/TermsView.vue');
const PrivacyView = () => import('../views/PrivacyView.vue');
const SearchView = () => import('../views/SearchView.vue');

const routes = [
    { path: '/', component: HomeView },
    { path: '/review', component: ReviewView },
    { path: '/terms', component: TermsView },
    { path: '/privacy', component: PrivacyView },
    { path: '/search', component: SearchView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
