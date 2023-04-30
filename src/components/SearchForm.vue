<template>
    <TransitionRoot appear :show="isModalOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#242424] p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-white">
                                Search
                            </DialogTitle>
                            <div class="mt-3">
                                <form @submit.prevent="search">
                                    <div class="mb-3">
                                        <input v-model="variablesStore.search_query" type="text" id="search" name="search" class="w-full px-3 py-2 rounded-lg bg-[#2e2e2e] border border-transparent focus:border-blue-500 focus:outline-none focus:shadow-outline-blue" placeholder="..." maxlength="30" autocomplete="off" required>
                                    </div>

                                    <div class="mt-4 flex">
                                        <div class="grow"></div>

                                        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";
import {useVariablesStore} from "../store/store.ts";
import VueTurnstile from 'vue-turnstile';

export default {
    name: "SearchForm",
    components: {DialogTitle, DialogPanel, Dialog, TransitionChild, TransitionRoot, VueTurnstile},
    setup() {
        const variablesStore = useVariablesStore();

        return {
            variablesStore
        }
    },
    data() {
        return {
            isModalOpen: false,
        }
    },
    mounted() {
        this.variablesStore.$subscribe((mutation, state) => {
            this.isModalOpen = state.show_search_form;
        })
    },
    methods: {
        closeModal() {
            this.isModalOpen = false;
            this.variablesStore.showSearchForm(false);

            setTimeout(() => {
                this.variablesStore.setSearchQuery("")
            }, 300);
        },
        search() {
            this.$router.push({path: "/search", query: {query: this.variablesStore.search_query}})
            this.closeModal();
        }
    }
}
</script>

<style scoped>

</style>
