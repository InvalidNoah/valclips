<template>
    <nav class="fixed w-full top-0 z-10 flex justify-between items-center h-16 bg-[#363636] text-white transition-all duration-500 ease-in-out">
        <div class="flex items-center ml-8">
            <router-link to="/" class="flex items-center">
                <h1 class="text-2xl font-semibold">NoahClips</h1>
            </router-link>
        </div>

        <div class="hidden md:block w-full max-w-xl mx-16">
            <form @submit.prevent="search" class="flex">
                <input v-model="variablesStore.search_query" type="text" id="search" name="search" class="w-full px-3 rounded-l-lg bg-[#2e2e2e] border border-[#505050] focus:border-blue-500 focus:outline-none focus:shadow-outline-blue" placeholder="Search" autocomplete="off" required>

                <button type="submit" aria-label="Search button" class="flex items-center bg-[#272727] hover:bg-[#202020] rounded-r-md py-1.5 px-3 border border-l-[0px] border-[#505050] hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="M784 936 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l252 252-56 56ZM380 656q75 0 127.5-52.5T560 476q0-75-52.5-127.5T380 296q-75 0-127.5 52.5T200 476q0 75 52.5 127.5T380 656Z"/></svg>
                </button>
            </form>
        </div>

        <div class="flex items-center mr-8 gap-4">
            <Popper content="Review" :hover="true">
                <router-link to="/review" v-if="isAdmin" class="flex items-center bg-[#272727] hover:bg-[#202020] rounded-md p-1.5 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="M772 453 602 285l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829 396l-57 57Zm-58 59L290 936H120V766l424-424 170 170Z"/></svg>
                </router-link>
            </Popper>
            <button @click="openSearchForm" aria-label="Open search form" class="block md:hidden flex items-center bg-[#272727] hover:bg-[#202020] rounded-md p-1.5 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="M784 936 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l252 252-56 56ZM380 656q75 0 127.5-52.5T560 476q0-75-52.5-127.5T380 296q-75 0-127.5 52.5T200 476q0 75 52.5 127.5T380 656Z"/></svg>
            </button>
            <Popper content="Submit" :hover="true">
                <button @click="openSubmitForm" aria-label="Open submit form" class="flex items-center bg-[#272727] hover:bg-[#202020] rounded-md p-1.5 hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                </button>
            </Popper>
        </div>
    </nav>

    <div class="mt-20"></div>

    <SubmitForm />
    <SearchForm />
</template>

<script>
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {useVariablesStore} from "../store/store.ts";
import SubmitForm from "./SubmitForm.vue";
import SearchForm from "./SearchForm.vue";

export default {
    name: "Navbar",
    components: {SearchForm, SubmitForm, MenuItem, MenuItems, Menu, MenuButton},
    setup() {
        const variablesStore = useVariablesStore()
        const isAdmin = localStorage.getItem("approve_key") !== null && localStorage.getItem("delete_key") !== null;

        return {variablesStore, isAdmin}
    },
    data() {
        return {
            prevScrollpos: window.pageYOffset,
        }
    },
    mounted() {
        window.onscroll = function() {
            const currentScrollPos = window.pageYOffset;
            const navbar = document.querySelector("nav");

            if (this.prevScrollpos > currentScrollPos) {
                // show navbar
                navbar.classList.add("translate-y-0");
                navbar.classList.remove("-translate-y-full");
            } else {
                // hide navbar
                navbar.classList.add("-translate-y-full");
                navbar.classList.remove("translate-y-0");
            }

            this.prevScrollpos = currentScrollPos;
        };
    },
    methods: {
        openSubmitForm() {
            this.variablesStore.show_submit_form = true;
        },
        openSearchForm() {
            this.variablesStore.show_search_form = true;
        },
        search() {
            this.$router.push({path: "/search", query: {query: this.variablesStore.search_query}})
        }
    }
}
</script>

<style scoped>

</style>
