import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
    state: () => ({
        video_data: null as VideoData | null,
        is_playing: false,
    }),
    actions: {
        setVideoData(video: VideoData) {
            this.video_data = video
        },
        setPlaying(value: boolean) {
            this.is_playing = value

            if (!value) {
                this.video_data = null
            }
        },
        clear() {
            this.video_data = null
            this.is_playing = false
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
