<script setup lang="ts">
import {ref,onMounted} from 'vue'
import style from '../styles/listCard.module.scss'
import DefaultModal from '/@/components/modal/defaultModal.vue'
import DetailCard from './detailCard.vue'
import {getSelectedMenuList} from '../utils/utils'
const {menuList}=defineProps(['menuList'])
const menu=ref({})
const selectMenu=ref({})
onMounted(() => {
    if(menuList.length>0){
        menu.value=menuList[menuList.length-1]
    }
})
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
 const buttonClick=(child)=>{
    console.log('点击弹窗数据处理')
    selectMenu.value=child
    modalRef.value.showDefaultModal.call(this,modalRef.value.visible)
 }


</script>
<template>
    <div :className="style.container">
        <div :className="style.title"><b>{{ menu.label? menu.label:'未命名' }}</b></div>
        <div :className="style.logo"></div>
        <div :className="style.container"> 
            <a-button
                :className="style.button"
                v-for="child in  menu.children?menu.children:[]"
                @click="buttonClick(child)"
            >{{child.label}}</a-button>
        </div>

        <DefaultModal ref="modalRef" :config="modalConfig">
            <DetailCard 
                :menuList="getSelectedMenuList(menuList,selectMenu)"
                v-bind="$attrs"
            />
        </DefaultModal>
    </div>
</template>
