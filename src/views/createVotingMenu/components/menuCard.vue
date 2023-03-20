<script setup lang="ts">
    import style from '../styles/menuCard.module.scss'
    import '/@/styles/common.scss'
    import { onMounted } from 'vue';
    import ListCard from './listCard.vue'
    import {Card} from '@vue3-common-packages/components'
    onMounted(() => {
        console.log('卡片处理')
    })
</script>
<template>
    <div>
        <Card :className="style.container">
            <template v-slot:header>
                <div  :className="style.title"> 
                    <div :className="style.logo"> logo </div>
                    <div :className="style.titleContent">标题内容</div>
                </div>
            </template>
            <div :className="style.content"> 
                <div :className="style.listContent">
                    <ListCard/>
                </div>
                <div :className="style.listContent">组件1</div>
                <div :className="style.listContent">组件1</div>
                <div :className="style.listContent">组件1</div>
                <div :className="style.listContent">组件1</div>
            </div>
        </Card>
    </div>
</template>