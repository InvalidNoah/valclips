import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
    state: () => ({
        loaded_video: new Map<string, VideoData>(),
        playing_video_id: null as string | null,
        is_playing: false,
    }),
    actions: {
        setPlayingVideoId(video_id: string) {
            this.playing_video_id = video_id
        },
        setPlaying(value: boolean) {
            if (this.is_playing === value) return

            this.is_playing = value
        },
        clear() {
            this.playing_video_id = null
            this.is_playing = false
        },
        putLoadedVideo(video_id: string, video_data: VideoData) {
            this.loaded_video.set(video_id, video_data)
        },
        isVideoLoaded(video_id: string) {
            return this.loaded_video.has(video_id)
        },
        getLoadedVideo(video_id: string) {
            return this.loaded_video.get(video_id)
        }
    }
})

export const useVariablesStore = defineStore('variables', {
    state: () => ({
        show_submit_form: false,
        show_search_form: false,
        search_query: ""
    }),
    actions: {
        showSubmitForm(value: boolean) {
            this.show_submit_form = value
        },
        showSearchForm(value: boolean) {
            this.show_search_form = value
        },
        setSearchQuery(value: string) {
            this.search_query = value
        }
    }
})
