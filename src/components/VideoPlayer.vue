<template>
    <div>
        <div class="aspect-video bg-[#404040] flex items-end rounded-md">
            <iframe :src="'https://www.youtube.com/embed/' + videoStore.playing_video_id + '?autoplay=1'"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="aspect-video rounded-md grow"
            ></iframe>
        </div>
<!--        <h1 class="text-base font-semibold truncate mt-2">-->
<!--            {{ videoStore.getLoadedVideo(this.video_id).title }}-->
<!--        </h1>-->
<!--        <h1 class="text-gray-300">{{ videoStore.getLoadedVideo(this.video_id).author_name }}</h1>-->
    </div>
</template>

<script>
import {useVideoStore} from "../store/store.ts";

export default {
    name: "VideoPlayer",
    setup() {
        const videoStore = useVideoStore()

        return {videoStore}
    },
    methods: {
        closePlayer() {
            this.videoStore.setPlaying(false)
        }
    }
}
</script>

<style scoped>

</style>
