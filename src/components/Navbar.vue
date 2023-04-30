<template>
    <div class="flex justify-between items-center h-16 bg-[#363636] text-white">
        <div class="flex items-center ml-8">
            <router-link to="/" class="flex items-center">
                <h1 class="text-2xl font-semibold">ValClips</h1>
            </router-link>
        </div>

        <div class="flex items-center mr-8 gap-4">
            <router-link to="/review" v-if="isAdmin" class="flex items-center bg-[#272727] hover:bg-[#202020] rounded-md p-1.5 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="M772 453 602 285l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829 396l-57 57Zm-58 59L290 936H120V766l424-424 170 170Z"/></svg>
            </router-link>
            <div @click="openSubmitForm" class="flex items-center bg-[#272727] hover:bg-[#202020] rounded-md p-1.5 hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
            </div>
        </div>
    </div>

    <SubmitForm />
</template>

<script>
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {useVariablesStore} from "../store/store.ts";
import SubmitForm from "./SubmitForm.vue";

export default {
    name: "Navbar",
    components: {SubmitForm, MenuItem, MenuItems, Menu, MenuButton},
    setup() {
        const variablesStore = useVariablesStore()
        const isAdmin = localStorage.getItem("approve_key") !== null && localStorage.getItem("delete_key") !== null;

        return {variablesStore, isAdmin}
    },
    methods: {
        openSubmitForm() {
            this.variablesStore.show_submit_form = true;
        }
    }
}
</script>

<style scoped>

</style>
