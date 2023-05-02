<template>
    <div class="mb-4">
        <!-- Image Skeleton -->
        <div v-if="!videoStore.isVideoLoaded(video_id)" class="aspect-video bg-[#404040] flex items-end rounded-md"></div>
        <!-- Real Image -->
        <div v-else @click="setVideo" class="aspect-video bg-[#404040] flex items-end rounded-md hover:cursor-pointer">
            <img :src="videoStore.getLoadedVideo(video_id)?.thumbnail_url?.replaceAll('hq', 'mq')" alt="" class="aspect-video rounded-md grow">
        </div>
        <!-- Title -->
        <h1 @click="setVideo" class="text-base font-semibold truncate mt-2 hover:cursor-pointer">
            {{ video_title }}
        </h1>
        <!-- Submitter -->
        <h1 class="text-gray-300 truncate">{{ author }}</h1>
    </div>
</template>

<script>
import {useVideoStore} from "../store/store.ts";
import VideoCardSkeleton from "./skeleton/VideoCardSkeleton.vue";
import * as api from "../assets/api.ts"

export default {
    name: "VideoCard",
    components: {VideoCardSkeleton},
    props: {
        video_id: {
            type: String,
            required: true
        },
        video_title: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const videoStore = useVideoStore()

        if (!videoStore.isVideoLoaded(props.video_id)) {
            api.getVideoData(props.video_id).then(data => {
                videoStore.putLoadedVideo(props.video_id, data);
            });
        }

        return {videoStore}
    },
    methods: {
        setVideo() {
            this.videoStore.setPlayingVideoId(this.video_id)
            this.videoStore.setPlaying(true)
        }
    }
}
</script>

<style scoped>

</style>
