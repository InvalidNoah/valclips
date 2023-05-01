import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";

const ReviewView = () => import('../views/ReviewView.vue');
const TermsView = () => import('../views/TermsView.vue');
const PrivacyView = () => import('../views/PrivacyView.vue');
const SearchView = () => import('../views/SearchView.vue');

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/review',
        component: ReviewView,
        // @ts-ignore
        beforeEnter: (to, from, next) => {
            if (!(!localStorage.getItem("approve_key") && !localStorage.getItem("delete_key"))) {
                return true;
            }

            next({path: '/'}); // redirect to home
            return false;
        },
    },
    {
        path: '/terms',
        component: TermsView
    },
    {
        path: '/privacy',
        component: PrivacyView
    },
    {
        path: '/search',
        component: SearchView
    },
    {
        path: '/:pathMatch(.*)*', // 404
        name: 'NotFound',
        component: () => import('../views/404View.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
