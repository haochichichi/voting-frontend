<script setup lang="ts">
    import {ref} from 'vue'
    import style from './styles/createVotingDetail.module.scss'
    import PageContainer from '/@/components/frame/pageContainer.vue'
    import BasicInfo from './components/basicInfo.vue'
    import ConfirmInfo from './components/confirmInfo.vue'
    
    const stepNum=ref(0)

</script>

<template>
    <PageContainer :className="style.container">
       <BasicInfo v-if="stepNum===0"/>
       <ConfirmInfo v-else />
    </PageContainer>
</template>