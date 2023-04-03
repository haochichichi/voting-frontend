<script setup lang="ts">
    import {ref,onMounted,onUnmounted} from 'vue'
    import PageContainer from '/@/components/frame/pageContainer.vue'
    import BasicInfo from './components/basicInfo.vue'
    import ConfirmInfo from './components/confirmInfo.vue'
    import {useCreateVotingDetailStore} from '/@/store/createVotingDetail.ts'
    
    const createVotingDetailStore=useCreateVotingDetailStore()
    const STEP_COMPONENT_DIC={
        0:BasicInfo,
        1:ConfirmInfo,
    }
    const stepNum=ref(0)
    const setStepNum=(num)=>{
        stepNum.value=num
    }
    // 清除填入数据
    onUnmounted(()=>{
        // 销毁回退
        console.log('[销毁数据]')
        createVotingDetailStore.$reset()
    })

    console.log(STEP_COMPONENT_DIC[0],stepNum.value)
</script>

<template>
    <PageContainer>
        <component 
            :is="STEP_COMPONENT_DIC[stepNum]"
            @setStepNum="setStepNum"
            :stepNum="stepNum"
            :createVotingDetailStore="createVotingDetailStore"
        />
    </PageContainer>
</template>