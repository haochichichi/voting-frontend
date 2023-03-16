<script setup lang="ts">
    import style from './style/createVotingMenu.module.scss'
    import MenuCard from './components/menuCard.vue'
    import { onMounted } from 'vue';
    onMounted(() => {
        console.log('[接口请求] 获取目录')
    })
</script>
<template>
    <div :className="style.container">
        <!-- <div :className="style.pageContainer"> -->
            <MenuCard/>
            <MenuCard/>
            <MenuCard/>
            

        <!-- <p></p>
        <p></p>
        <p></p> -->
        <!-- </div> -->
    </div>
</template>