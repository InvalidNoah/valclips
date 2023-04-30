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
                                Submit Clip
                            </DialogTitle>
                            <div class="mt-2">
                                <form @submit.prevent="openVerificationModal">
                                    <div class="mb-3">
                                        <label for="author" class="text-gray-200">Username</label>
                                        <input v-model="username" type="text" id="author" name="author" class="w-full px-3 py-2 rounded-lg bg-[#2e2e2e] border border-transparent focus:border-blue-500 focus:outline-none focus:shadow-outline-blue" placeholder="Enter username" maxlength="30" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="video_id" class="text-gray-200">YouTube Video URL (2 minute max)</label>
                                        <input v-model="video_url" type="text" id="video_id" name="video_id" class="w-full px-3 py-2 rounded-lg bg-[#2e2e2e] border border-transparent focus:border-blue-500 focus:outline-none focus:shadow-outline-blue" placeholder="Enter the YouTube video url" autocomplete="off" required>
                                    </div>

                                    <div class="text-gray-300 text-sm">
                                        By submitting a clip, you agree to the <a href="/terms" target="_blank" class="text-blue-500 hover:underline">Terms of Service</a> and <a href="/privacy" target="_blank" class="text-blue-500 hover:underline">Privacy Policy</a>.
                                    </div>

                                    <div class="mt-4 flex">
                                        <div class="grow"></div>

                                        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                            Submit
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

    <TransitionRoot appear :show="isVerificationModalOpen" as="template">
        <Dialog as="div" @close="closeVerificationModal" class="relative z-10">
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
                        <DialogPanel class="transform overflow-hidden rounded-2xl bg-[#242424] p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-white">
                                Captcha Verification
                            </DialogTitle>
                            <div class="mt-2">
                                <form action="https://valclips-db.hop.sh/submit" method="post">
                                    <div class="hidden">
                                        <input v-model="username" type="text" id="author" name="author" class="w-full px-3 py-2 rounded-lg bg-[#2e2e2e] border border-transparent focus:border-blue-500 focus:outline-none focus:shadow-outline-blue" placeholder="Enter username" maxlength="30" required>
                                    </div>
                                    <div class="hidden">
                                        <input v-model="video_url" type="text" id="video_id" name="video_id" class="w-full px-3 py-2 rounded-lg bg-[#2e2e2e] border border-transparent focus:border-blue-500 focus:outline-none focus:shadow-outline-blue" placeholder="Enter the YouTube video url" autocomplete="off" required>
                                    </div>

                                    <div>
                                        <VueTurnstile site-key="0x4AAAAAAAETCDBYh9DTANun" v-model="turnstileToken" />
                                    </div>

                                    <div class="mt-4 flex">
                                        <div class="grow"></div>

                                        <button type="submit" id="submit-button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:cursor-wait" disabled>
                                            Submit
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
    name: "SubmitForm",
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
            isVerificationModalOpen: false,
            turnstileToken: null,
            username: null,
            video_url: null
        }
    },
    watch: {
        turnstileToken: function (val) {
            if (val) {
                document.getElementById("submit-button").disabled = false;
                document.getElementById("submit-button").classList.remove('hover:cursor-wait');
            }
        }
    },
    mounted() {
        this.variablesStore.$subscribe((mutation, state) => {
            this.isModalOpen = state.show_submit_form;
        })
    },
    methods: {
        openVerificationModal() {
            this.isModalOpen = false;
            this.isVerificationModalOpen = true;

            this.closeModal();
        },
        closeVerificationModal() {
            this.isModalOpen = false;
            this.isVerificationModalOpen = false;

            this.closeModal();

            this.username = null;
            this.video_url = null;
            this.turnstileToken = null;
        },
        closeModal() {
            this.variablesStore.show_submit_form = false;
        }
    }
}
</script>

<style scoped>

</style>
