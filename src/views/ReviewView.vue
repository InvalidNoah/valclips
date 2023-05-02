<template>
    <Navbar/>

    <!-- Video Cards -->
    <div class="container">
        <h1 v-if="loadedClips.length <= 0 && !isLoadingClips" class="text-2xl text-white text-center mt-4">No clips to review</h1>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 my-4">
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
                            <DialogPanel class="transform overflow-hidden w-full max-w-4xl align-middle transition-all">
                                <div class="rounded-lg md:rounded-xl bg-[#242424] p-1 md:p-5 text-left">
                                    <VideoPlayer/>
                                </div>

                                <div class="mt-2 rounded-lg md:rounded-xl bg-[#242424] p-2 text-left">
                                    <div class="flex justify-center gap-2">
                                        <button @click="approveClip" class="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded transition duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="M382 816 154 588l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                        </button>
                                        <button @click="rejectClip" class="bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 rounded transition duration-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="m256 856-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                        </button>
                                    </div>
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
import {useRoute} from "vue-router";

export default {
    name: "ReviewView",
    components: {
        VideoCardSkeleton,
        Navbar, VideoPlayer, Dialog, TransitionRoot, DialogTitle, DialogPanel, TransitionChild, VideoCard
    },
    setup() {
        const videoStore = useVideoStore()
        const route = useRoute()

        const videoId = route.query.v;
        if (videoId !== undefined) {
            if (videoStore.isVideoLoaded(videoId)) {
                videoStore.setPlayingVideoId(videoId);
                videoStore.setPlaying(true);
            } else {
                api.getVideoData(videoId).then(data => {
                    videoStore.putLoadedVideo(videoId, data);

                    videoStore.setPlayingVideoId(videoId);
                    videoStore.setPlaying(true);
                });
            }
        }

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
            }
        }
    },
    mounted() {
        this.loadClips(20);

        if (this.videoStore.is_playing) {
            this.openPlayer()
        }

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
                this.loadClips(5);
            }
        });
    },
    methods: {
        loadClips(clips) {
            if (this.isLoadingClips) return;

            this.isLoadingClips = true;

            api.getAllClips(this.lastIndex, this.lastIndex + clips).then(data => {
                data = data.filter(clip => clip.approved === 0)
                this.loadedClips = this.loadedClips.concat(data)
                this.lastIndex += clips
            }).catch(err => {
                console.error(err)
            }).finally(() => {
                this.isLoadingClips = false;
            })
        },
        reloadClips() {
            this.loadedClips = [];
            this.lastIndex = 0;
            this.loadClips(20);
        },
        approveClip() {
            api.approveVideo(this.videoStore.playing_video_id, localStorage.getItem("approve_key")).then(() => {
                this.reloadClips();
                this.videoStore.setPlaying(false);

                this.openDialog(
                    "Clip Approved",
                    "The clip has been approved and will be added to the database.",
                    "Ok"
                );
            }).catch(err => {
                console.error(err)
                this.openDialog(
                    "Error",
                    "An error occurred while approving the clip.",
                    "Ok"
                )
            })
        },
        rejectClip() {
            api.deleteVideo(this.videoStore.playing_video_id, localStorage.getItem("delete_key")).then(() => {
                this.reloadClips();
                this.videoStore.setPlaying(false);
                this.openDialog(
                    "Clip Rejected",
                    "The clip has been rejected and will not be added to the database.",
                    "Ok"
                );
            }).catch(err => {
                console.error(err)
                this.openDialog(
                    "Error",
                    "An error occurred while rejecting the clip.",
                    "Ok"
                );
            });
        },
        closePlayer() {
            this.$router.replace({query: {}})

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
            this.openPopup = true;
        }
    }
}
</script>

<style scoped>

</style>
