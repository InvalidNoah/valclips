<template>
    <Navbar/>

    <!-- Video Cards -->
    <div class="container">
        <h1 v-if="loadedClips.length <= 0 && !isLoadingClips" class="text-2xl text-white text-center mt-4">No clips found</h1>

        <div v-if="loadedClips.length <= 0 && isLoadingClips" role="status" class="flex justify-center mt-4">
            <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
            <VideoCard v-for="video in loadedClips"
                       :key="video.video_id"
                       :video_id="video.video_id"
                       :views="video.views"
                       :likes="video.likes"
                       :author="video.author"
            />
        </div>
    </div>

    <!-- Video Player -->
    <div>
        <TransitionRoot appear :show="isPlayerOpen" as="template">
            <Dialog as="div" @close="closePlayer" class="relative z-10">
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
                    <div class="flex min-h-full items-center justify-center p-2 text-center">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#242424] p-1 md:p-5 text-left align-middle shadow-xl transition-all">
                                <VideoPlayer/>

                                <div class="flex justify-center gap-2">
                                    <button v-if="hasKey" @click="deleteClip" class="mt-4 bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded transition duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="M280 936q-33 0-56.5-23.5T200 856V336h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680 936H280Zm80-160h80V416h-80v360Zm160 0h80V416h-80v360Z"/></svg>
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>

    <!-- Popup Dialog -->
    <div>
        <TransitionRoot appear :show="openPopup" as="template">
            <Dialog as="div" @close="openPopup = false" class="relative z-10">
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
                                    {{ popup.title }}
                                </DialogTitle>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-400">
                                        {{ popup.message }}
                                    </p>
                                </div>

                                <div class="mt-4">
                                    <button type="button" class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 outline-none ring-0" @click="openPopup = false">
                                        {{ popup.button }}
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script>
import VideoCard from "../components/VideoCard.vue";
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from "@headlessui/vue";
import VideoPlayer from "../components/VideoPlayer.vue";
import {useVariablesStore, useVideoStore} from "../store/store.ts";
import Navbar from "../components/Navbar.vue";
import VideoCardSkeleton from "../components/skeleton/VideoCardSkeleton.vue";
import * as api from "../assets/api.ts"

export default {
    name: "SearchView",
    components: {
        VideoCardSkeleton,
        Navbar, VideoPlayer, Dialog, TransitionRoot, DialogTitle, DialogPanel, TransitionChild, VideoCard},
    setup() {
        const videoStore = useVideoStore()
        const variablesStore = useVariablesStore()
        return {videoStore, variablesStore}
    },
    data() {
        return {
            isPlayerOpen: false,
            openPopup: false,
            loadedClips: [],
            lastIndex: 0,
            isLoadingClips: false,
            popup: {
                title: "",
                message: "",
                button: ""
            },
            hasKey: false,
            searchQuery: "",
        }
    },
    created() {
        this.searchQuery = this.$route.query.query;
        this.variablesStore.setSearchQuery(this.searchQuery);

        this.$watch(
            () => this.$route.query,
            () => {
                this.searchQuery = this.$route.query.query;
                this.reloadClips();
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    mounted() {
        this.loadClips(20);

        this.videoStore.$subscribe((mutation, state) => {
            if (state.is_playing) {
                this.openPlayer()
            } else {
                this.closePlayer()
            }
        })

        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight) {
                this.loadClips(10);
            }
        });

        if (localStorage.getItem("delete_key") !== null) {
            this.hasKey = true
        }
    },
    methods: {
        loadClips(clips) {
            if (this.isLoadingClips) return;

            this.isLoadingClips = true;

            api.searchVideos(this.searchQuery, this.lastIndex, this.lastIndex + clips).then(data => {
                this.loadedClips.push(...data)
                this.lastIndex += clips
            }).catch(err => {
                console.error(err)
            }).finally(() => {
                this.isLoadingClips = false;
            });

        },
        closePlayer() {
            this.isPlayerOpen = false;
            this.videoStore.setPlaying(false)
        },
        openPlayer() {
            this.isPlayerOpen = true;
        },
        openDialog(title, message, button) {
            this.popup = {
                title: title,
                message: message,
                button: button
            }

            this.openPopup = true
        },
        reloadClips() {
            this.loadedClips = [];
            this.lastIndex = 0;
            this.loadClips(20);
        },
        deleteClip() {
            api.deleteVideo(this.videoStore.video_data.id, localStorage.getItem("delete_key")).then(() => {
                this.openDialog(
                    "Clip deleted!",
                    "The clip has been deleted.",
                    "Got it"
                );
            }).catch(err => {
                console.error(err)
                this.openDialog(
                    "Error!",
                    "An error occurred while deleting your clip.",
                    "Ok"
                );
            }).finally(() => {
                this.videoStore.setPlaying(false);
                this.reloadClips();
            })
        }
    }
}
</script>

<style scoped>

</style>
