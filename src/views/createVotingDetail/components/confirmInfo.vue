<script setup lang="ts">
    import {reactive, ref, computed,defineAsyncComponent, onMounted,onUnmounted} from 'vue'
    import style from '../styles/votingInfo.module.scss'
    import {Card} from '@vue3-common-packages/components'
    import {readWorkbookFromLocalFile,excelFileToBlob,workbookObjToArray,arrayToWorkbookObj} from '@vue3-common-packages/utils'
    import {workbookArrayToTable,displayTableTag} from '../utils/constant'
    import { storeToRefs } from 'pinia';
    
    
    const {stepNum,createVotingDetailStore} =defineProps(['stepNum','createVotingDetailStore'])
    const {form, getFormState,saveFormState} = storeToRefs(createVotingDetailStore) //实现响应式
    const emits = defineEmits(['setStepNum'])
    const tableData=ref({
        dataSource:[],
        columns:[]
    })
    onMounted(() => {
        // 去除水印
        displayTableTag()
        // 回退跳转
        history.pushState(null, null, document.URL)
        window.addEventListener("popstate", cancelConfirm, false); // 回退时执行goback方法
        // 初始化数据
        console.log('跳转数据',createVotingDetailStore.form)
        if(createVotingDetailStore.form?.votingTemplateFiles?.length>0){
            const file=excelFileToBlob(createVotingDetailStore.form.votingTemplateFiles[0])
            readWorkbookFromLocalFile(file,(content)=>{
                const array=workbookObjToArray(content)
                console.log('数据内容',array)
                // console.log(arrayToWorkbookObj('test',array.workbookArray))
                // arrayToWorkbookObj('test1',array.workbookArray).saveExcel()
                tableData.value=workbookArrayToTable(array.workbookArray[0])
            })
        }
        
    })
    onUnmounted(()=>{
        // 销毁回退
        window.removeEventListener("popstate", cancelConfirm, false);

    })

    const cancelConfirm=()=>{
        emits('setStepNum',stepNum-1)
    }
    
</script>
<template>
    <Card :className="style.container">
        <template v-slot:headerLeft>选票票样预览</template>
        <div   :className="`${style.content} ${style.templateContent}`">
            <p :className="style.title">展示表格</p>
            <div :className="style.excelContent">
                <!-- excel 表格 -->
                <!-- <a-table :dataSource="tableData.dataSource" :columns="tableData.columns" /> -->
                <s-table
                    :className="style.excelContent"
                    :columns="tableData.columns"
                    :scroll="{ y: 400 }"
                    :pagination="false"
                    :data-source="tableData.dataSource"
                ></s-table>
            </div>
            <div :className="style.buttonList">
                <a-button 
                    style="margin-left: 10px"
                    @click="cancelConfirm"
                >
                    返回
                </a-button>
                <a-button
                    type="primary" 
                >创建</a-button>
            </div>
        </div>
    </Card>
</template>
