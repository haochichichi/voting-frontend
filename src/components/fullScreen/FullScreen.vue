<template>
    <div ref="button" @click="toggleFullscreen">
        <button>111 </button>
    </div>
    <div ref="page">
        <button>222 </button>
    </div>
    </template>


<script setup lang="ts">
    import{ref} from 'vue'
    import {useFullscreen} from '/@packages/headless'

    const button = ref(null)
    const page = ref(null)

    const { isTargetFullscreen, toggleFullscreen } = useFullscreen({
            getElement: ()=>button.value,
            onFullscreenChange: (value) => {
                console.log('!!!',value)
            },
        })
    console.log(useFullscreen)
</script>