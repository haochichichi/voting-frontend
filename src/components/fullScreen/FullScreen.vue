<template>
    <div ref="button">
        <button>111 </button>
    </div>
    <div ref="page">
        <button>222 </button>
    </div>
    </template>


<script setup lang="ts">
    import{ref} from 'vue'
    import {useFullscreen} from '/@packages/headless'
    console.log(useFullscreen)
</script>