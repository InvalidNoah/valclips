import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
    state: () => ({
        video_data: null as object | null,
        is_playing: false,
    }),
    actions: {
        setVideoData(video: object) {
            this.video_data = video
        },
        setPlaying(value: boolean) {
            this.is_playing = value
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
    }),
    actions: {
        showSubmitForm(value: boolean) {
            this.show_submit_form = value
        }
    }
})
