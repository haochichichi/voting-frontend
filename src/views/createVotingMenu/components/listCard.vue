<script setup lang="ts">
import style from '../style/listCard.module.scss'
import DefaultModal from '/@/components/modal/defaultModal.vue'
import DetailCard from './detailCard.vue'
import {ref} from 'vue'
 const testDataButton=ref([
    {
        title:'111',
        code:'222',
    },
    {
        title:'333',
        code:'444',
    },
 ])
 const modalRef= ref(null)
 const modalConfig={
    closable:false,
    bodyStyle:{
        padding:0,
        minHeight:'50px',
        maxWidth:'780px'
    },
    width:780
 }
 const buttonClick=()=>{
    console.log('点击数据处理')
    modalRef.value.showDefaultModal.call(this,modalRef.value.visible)
 }


</script>
<template>
    <div :className="style.container">
        <div>组件名称</div>
        <div>装饰logo</div>
        <div :className="style.container"> 
            <button 
                :className="style.button"
                v-for="item in testDataButton"
                @click="buttonClick"
            >{{item.title}}</button>
        </div>

        <DefaultModal ref="modalRef" :config="modalConfig">
            <DetailCard/>
        </DefaultModal>
    </div>
</template>
