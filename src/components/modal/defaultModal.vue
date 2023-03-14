<script setup lang="ts">
    import { ref, toRefs, toRef,onMounted } from "vue";
    // import {DefaultModal} from '@vue3-common-packages/components'
    import {DefaultModal,changeDefaultModal} from '@vue3-common-packages/components'
    // import {DefaultModal,changeDefaultModal} from '/@/components/fullScreen/defaultModal'
    import {getFileContentName} from '@vue3-common-packages/utils'
    const MODAL_WIDTH=900
    const MODAL_HEIGHT=600

    const visible = ref<boolean>(false);
    const props =defineProps(['config'])
    let defaultModalConfig = ref({
        footer:null,
        width:MODAL_WIDTH,
        bodyStyle:{
            padding:0,
            minHeight:'50px',
            height:`${MODAL_HEIGHT}px`,
            width:`${MODAL_WIDTH}px`,
        },
        beforeCancel:()=>{},
        ...props.config
    })
    defaultModalConfig.value.visible=visible
    // defaultModalConfig.value.onCancel=()=>{
    //     visible.value=false
    // }
   
    
    const showDefaultModal = ()=>{
        changeDefaultModal.call(this,visible,true)
    }

    const closeDefaultModal = ()=>{
        changeDefaultModal.call(this,visible,false)
    }
    
    

    defineExpose({
        visible,
        showDefaultModal,
        closeDefaultModal,
    })
</script>


<template>
    <DefaultModal
    :config="defaultModalConfig" 
    >
        <slot></slot>
    </DefaultModal>
</template>