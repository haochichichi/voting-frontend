import {
    EnhancedHTMLElement,
    enterFullscreen,
    exitFullscreen,
    getFullscreenElement,
    isFullscreen,
    listenFullscreen,
} from '@vue3-common-packages/utils'
import { onMounted, ref } from 'vue'

export interface UseFullscreenOptions {
    getElement?: () => EnhancedHTMLElement
    onFullscreenChange?: (state: boolean) => void
}

export const useFullscreen = ({ getElement = () => document.body, onFullscreenChange }: UseFullscreenOptions = {}) => {
    const isTargetFullscreen = ref(false)
    const checkFullscreenStatus = () => {
        const isFullscreenFlag = isFullscreen()
        isTargetFullscreen.value = isFullscreenFlag ? (getFullscreenElement() || document.body) === getElement() : false
    }
    const toggleFullscreen = () => {
        checkFullscreenStatus()
        if (isTargetFullscreen.value === true) {
            exitFullscreen()
        } else {
            enterFullscreen(getElement())
        }
    }
    onMounted(() => {
        checkFullscreenStatus()
        listenFullscreen(() => {
            checkFullscreenStatus()
            onFullscreenChange?.(isTargetFullscreen.value)
        })
    })

    return {
        isTargetFullscreen,
        toggleFullscreen,
    }
}
