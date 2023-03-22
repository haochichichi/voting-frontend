<script setup lang="ts">
    import style from './style/frame.module.scss'
    import Frame from '/@/components/frame/frame.vue'
    import { onMounted } from 'vue';

    // 身份验证
    console.log('身份验证')
    onMounted(()=>{
        let domArr = document.getElementsByTagName('div')
        for (let i = 0; i < domArr.length; i++) {
            if (['Unlicensed Product'].includes(domArr[i].innerText)) {
            domArr[i].remove()
            }
        }
        const surelyBody=document.getElementsByClassName('surely-table-body')
        if(surelyBody.length>0){
            let domArr2 = surelyBody[0].getElementsByTagName("div")
        for (let i=0;i<domArr2.length;i++){
            if (['Powered by Surely Vue'].includes(domArr2[i].innerText)) {
            domArr2[i].innerText = ''
            }
        }
        }
        
    })
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