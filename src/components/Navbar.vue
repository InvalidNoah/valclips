<template>
    <div class="flex justify-between items-center h-16 bg-[#363636] text-white">
        <div class="flex items-center ml-8">
            <router-link to="/" class="flex items-center">
                <h1 class="text-2xl font-semibold">ValClips</h1>
            </router-link>
        </div>

        <div class="flex items-center mr-8">
            <div @click="openSubmitForm" class="flex items-center hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        return {variablesStore}
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
