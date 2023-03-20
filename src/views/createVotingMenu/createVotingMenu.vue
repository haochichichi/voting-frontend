<script setup lang="ts">
    import style from './styles/createVotingMenu.module.scss'
    import MenuCard from './components/menuCard.vue'
    import { onMounted } from 'vue';
    onMounted(() => {
        console.log('[接口请求] 获取目录')
    })
</script>
<template>
    <div :className="style.container">
            <MenuCard :className="style.menuCard"/>
            <MenuCard :className="style.menuCard"/>
            <MenuCard :className="style.menuCard"/>
            
    </div>
</template>