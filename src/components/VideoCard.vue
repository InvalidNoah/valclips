<template>
    <VideoCardSkeleton v-if="Object.keys(video_data).length === 0" />

    <div class="mb-4">
        <!-- Video -->
        <div @click="setVideo" class="aspect-video bg-[#404040] flex items-end rounded-md hover:cursor-pointer">
            <img :src="video_data?.thumbnail_url?.replaceAll('hq', 'mq')" alt="" class="aspect-video rounded-md grow">
            <!-- Views -->
<!--            <div class="absolute text-sm bg-gray-600 rounded-md m-2 px-1 text-center">{{ views }} views</div>-->
        </div>
        <!-- Title -->
        <h1 @click="setVideo" class="text-base font-semibold truncate mt-2 hover:cursor-pointer">{{ video_data?.title }}</h1>
        <!-- Submitter -->
        <h1 class="text-gray-300 truncate">{{ author }}</h1>
    </div>
</template>

<script>
import {useVideoStore} from "../store/store.ts";
import VideoCardSkeleton from "./skeleton/VideoCardSkeleton.vue";

export default {
    name: "VideoCard",
    components: {VideoCardSkeleton},
    props: {
        video_id: {
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
    setup() {
        const videoStore = useVideoStore()

        return {videoStore}
    },
    data() {
        return {
            video_data: {}
        }
    },
    mounted() {
        fetch("https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + this.video_id + "&format=json")
            .then(response => response.json())
            .then(data => {
                this.video_data = {
                    id: this.video_id,
                    ...data
                }
            })
    },
    methods: {
        setVideo() {
            this.videoStore.setVideoData(this.video_data)
            this.videoStore.setPlaying(true)
        }
    }
}
</script>

<style scoped>

</style>
