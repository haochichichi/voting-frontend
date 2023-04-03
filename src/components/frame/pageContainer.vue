<!-- 带headbar时使用的页面容器 -->
<script setup lang="ts">
    import style from './styles/pageContainer.module.scss'
    import {ref,defineProps} from 'vue'
    const props =defineProps(['conatinerType','className'])


</script>


<template>
    <div :className="style.container">
        <div 
            :className="`${style[`${props.conatinerType? props.conatinerType:'default'}-container`]} ${props.className?props.className:''}`"
        >
            <slot></slot>
        </div>
    </div>
</template>