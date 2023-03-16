<script setup lang="ts">
    import style from './style/frame.module.scss'
    import Frame from '/@/components/frame/frame.vue'

    // 身份验证
    console.log('身份验证')
</script>

<template>
    <Frame>
        <template v-slot:headerContent>我是表中</template>
        <template v-slot:headerRight>我是右表头</template>
        <template v-slot:content>
            <router-view/>
        </template>
    </Frame>
</template>