<script setup lang="ts">
    import style from '../style/menuCard.module.scss'
    import '/@/styles/common.scss'
    import { onMounted } from 'vue';
    import ListCard from './listCard.vue'
    onMounted(() => {
        console.log('卡片处理')
    })
</script>
<template>
    <div  class="box-shadow" :className="style.container">
        <div :className="style.title"> 
            <div :className="style.logo"> logo </div>
            <div :className="style.titleContent">标题内容</div>
        </div>
        <div :className="style.content"> 
            <div :className="style.listContent">
                <ListCard/>
            </div>
            <div :className="style.listContent">组件1</div>
            <div :className="style.listContent">组件1</div>
            <div :className="style.listContent">组件1</div>
            <div :className="style.listContent">组件1</div>
        </div>
    </div>
</template>