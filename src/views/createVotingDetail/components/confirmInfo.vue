<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import {reactive, ref, computed,defineAsyncComponent, onMounted,onUnmounted} from 'vue'
    import style from '../styles/votingInfo.module.scss'
    import {Card} from '@vue3-common-packages/components'
    import {
        readWorkbookFromLocalFile,
        excelFileToBlob,
        workbookObjToArray,
        arrayToWorkbookObj,
        zipToFileList,
    } from '@vue3-common-packages/utils'
    
    import {workbookArrayToTable,displayTableTag,fileListToPdfList} from '../utils/utils'
    import { storeToRefs } from 'pinia';
    
    const router = useRouter()
    const {stepNum,createVotingDetailStore} =defineProps(['stepNum','createVotingDetailStore'])
    const {form, getFormState,saveFormState} = storeToRefs(createVotingDetailStore) //实现响应式
    const emits = defineEmits(['setStepNum'])
    const tableData=ref({
        dataSource:[],
        columns:[]
    })
    onMounted(async () => {
        // 去除水印
        displayTableTag()
        // 回退跳转
        history.pushState(null, null, document.URL)
        window.addEventListener("popstate", cancelConfirm, false); 
        // 初始化数据
        console.log('跳转数据',createVotingDetailStore.form.reviewYear.year())
        // 解析excel
        if(createVotingDetailStore.form?.votingTemplateFiles?.length>0){
            const file=excelFileToBlob(createVotingDetailStore.form.votingTemplateFiles[0])
            readWorkbookFromLocalFile(file,(content)=>{
                const workbook=workbookObjToArray(content)
                console.log('[excel文件解析]',workbook)
                // console.log(arrayToWorkbookObj('test',workbook.workbookArray))
                // arrayToWorkbookObj('test1',workbook.workbookArray).saveExcel()
                tableData.value=workbookArrayToTable(workbook.workbookArray[0]) // 当前默认解析sheet1
            })
        }
        // 解析pdf
        if(createVotingDetailStore.form?.applicationMaterialsFiles?.length>0){
            const fileList=await zipToFileList(createVotingDetailStore.form.applicationMaterialsFiles[0])
            console.log('[pdf解析]',createVotingDetailStore.form.applicationMaterialsFiles[0],fileList,fileList.length)
            const pdfList=fileListToPdfList(fileList)
            console.log('[pdf解析结果]',pdfList)
        }
        
    })
    onUnmounted(()=>{
        // 销毁回退
        window.removeEventListener("popstate", cancelConfirm, false);

    })

    const cancelConfirm=()=>{
        emits('setStepNum',stepNum-1)
    }

    const onConfirm = ()=>{
        console.log('[创建会议]')
        router.push({name:`currentVotingMenu`})
    }
    
</script>
<template>
    <Card :className="style.container">
        <template v-slot:headerLeft>选票票样预览</template>
        <div   :className="`${style.content} ${style.templateContent}`">
            <p :className="style.title">展示表格</p>
            <div :className="style.excelContent">
                <!-- excel 表格 -->
                <a-table 
                    :dataSource="tableData.dataSource" 
                    :columns="tableData.columns" 
                    :scroll="{ y: 550,x:1400 }"
                    :pagination="false"
                />
                <!-- <s-table
                    :columns="tableData.columns"
                    
                    :pagination="false"
                    :data-source="tableData.dataSource"
                ></s-table> -->
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
                    @click="onConfirm"
                >创建</a-button>
            </div>
        </div>
    </Card>
</template>
