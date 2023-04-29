<template>
    <Navbar/>

    <!-- Video Cards -->
    <div class="container">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
            <VideoCardSkeleton v-if="loadedClips.length <= 0" v-for="i in 20"/>

            <VideoCard v-else v-for="video in loadedClips"
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
                            <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#242424] p-6 text-left align-middle shadow-xl transition-all">
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
import {useVideoStore} from "../store/store.ts";
import Navbar from "../components/Navbar.vue";
import VideoCardSkeleton from "../components/skeleton/VideoCardSkeleton.vue";
import * as api from "../assets/api.ts"

export default {
    name: "HomeView",
    components: {
        VideoCardSkeleton,
        Navbar, VideoPlayer, Dialog, TransitionRoot, DialogTitle, DialogPanel, TransitionChild, VideoCard},
    setup() {
        const videoStore = useVideoStore()
        return {videoStore}
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
            hasKey: false
        }
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

        if (this.$route.query.success === "true") {
            this.$router.replace({query: {}})

            this.openDialog(
                "Clip submitted!",
                "Your clip has been submitted for review. It will be added to the site shortly.",
                "Got it, thanks!"
            )
        }

        if (this.$route.query.reason === "exists") {
            this.$router.replace({query: {}})

            this.openDialog(
                "Clip already exists!",
                "This clip has already been submitted to the site.",
                "Got it"
            )
        }

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

            api.getApprovedClips(this.lastIndex, this.lastIndex + clips).then(data => {
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
