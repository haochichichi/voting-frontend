<script setup lang="ts">
    import style from '../styles/votingInfo.module.scss'
    import { Moment } from 'moment';
    import {Card} from '@vue3-common-packages/components'
    import {reactive, ref, computed,defineAsyncComponent, onMounted} from 'vue'
    import {Button,Form,Input} from 'ant-design-vue'
    import {INPUT_LABLE_DIC} from '../utils/constant'
    import dayjs, { Dayjs } from 'dayjs';
    import { useRouter } from 'vue-router'
    import { FileZipOutlined,FileAddOutlined } from '@ant-design/icons-vue';
    import { storeToRefs } from 'pinia';
    // 工具函数
    import {
        workbookArrayToTable,
        readSelectedMenu,
        displayTableTag,
        fileListToPdfList,
        getSelectedMeetingTemplate,
        isFullInput,
    } from '../utils/utils'

    // MOCK数据
    import {MOCK_MENU,MOCK_ENUMS} from '../../createVotingMenu/utils/mockData'
import { Item } from 'ant-design-vue/lib/menu';
   

    const YEAR_DEFAULT_FORMATE='YYYY'
    const router = useRouter()
    const {stepNum,createVotingDetailStore} =defineProps(['stepNum','createVotingDetailStore'])
    const emits = defineEmits(['setStepNum'])
    const {form:storageForm, getFormState,saveFormState} = storeToRefs(createVotingDetailStore) //实现响应式
    const menuList=ref([])
    const enums=ref([])
 
    // 表格
    const form: UnwrapRef<form> = reactive({});

    onMounted(() => {
         // 接口数据处理
         console.log('[接口请求] 获取目录、获取enums')
        menuList.value=MOCK_MENU
        enums.value=MOCK_ENUMS

        // 路由数据处理
        const params=router.currentRoute.value.query
        console.log('[路由参数]', params)
        // 表格数据初始化
        const initMenuInfo= getSelectedMeetingTemplate(enums.value,menuList.value,params)
        if(!initMenuInfo||!initMenuInfo.isValid){
            console.log('[重定向处理]')
        }
        form.baseInfo=initMenuInfo
        // formConfig.forEach(item=>{
        //     form[item.formLabel]=ref()
        // })

        // 时间默认为当前时间、标题提供初始化值
        form.reviewYear=dayjs(`${new Date()}`,YEAR_DEFAULT_FORMATE)
        form.meetingRoomCode=111
        form.title=getTitleContent(form.reviewYear.year(),initMenuInfo.attrLabels,initMenuInfo.menuLabels)
    })



    // 动态计算是否全部填写完成
    const submitDisabled = computed(()=>{
        console.log('触发吗?',isFullInput(formConfig))
        // const countString=`!(${isFullInput(formConfig)})`
        // // return !(form.baseInfo&&form.reviewYear&&form.targetCount)
        // // let result=false

        // return eval(countString)
        return !(form.reviewYear&&form.targetCount&&form.expertCount&&form.meetingRoomCode&&form.votingTemplateFiles&&form.applicationMaterialsFiles)
    })

    const getTitleContent=(year,attrs,menus)=>{
        const menuTitleList=[menus.shift(),menus.pop()]
        return `${year}年${attrs? attrs.join(''):''}${menuTitleList.filter(item=>item).join('')}`
    }

    // 动态计算 评审投票系统
    const titleContent=computed(()=>{
        let result='未命名'
        // return result
        if (form.baseInfo&&form.reviewYear){
            result=`${form.baseInfo?.attrLabels? form.baseInfo.attrLabels.join(''):''}${form.reviewYear.year()}年${form.baseInfo?.menuLabels? form.baseInfo.menuLabels.join(''):''}`
        }
        return result
    })

   

    // const form=createVotingDetailStore.form

    const mode1 = ref<string>('year');

    const meetingRoomOptions=[
    //     {
    //     value: 'jack',
    //     label: 'Jack',
    //   },
    //   {
    //     value: 'lucy',
    //     label: 'Lucy',
    //   },
    //   {
    //     value: 'disabled',
    //     label: 'Disabled',
    //     disabled: true,
    //   },
    //   {
    //     value: 'yiminghe',
    //     label: 'Yiminghe',
    //   },
    ]

    const formConfig=[
        [{
            component:'date',
            formLabel:'reviewYear',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
            config:{
                format:'YYYY',
                picker:'year',
            }
            
        },
        // {
        //     component:'label',
        //     formLabel:'title',
        //     className:style.titleInput,
        //     formItemConfig:{
        //         rules:[{ required: true, message: '输入不得为空!' }]
        //     },
        //     value:titleContent,
        //     config:{
        //         bordered:false,
        //         disabled:true,
        //         value:titleContent.value,
        //     }
        // },
        {
            component:'input',
            formLabel:'title',
            className:style.titleInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
            config:{
            }
        }],
        [{
            component:'input',
            formLabel:'targetCount',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
        },{
            component:'input',
            formLabel:'expertCount',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
        },{
            component:'select',
            options:meetingRoomOptions,
            formLabel:'meetingRoomCode',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
        }],
        [{
            component:'upload',
            uploadConfig:{
                icon:FileAddOutlined,
                comment:'请点击/拖拽上传含参评模板的excel文件',
            },
            formLabel:'votingTemplateFiles',
            className:style.defaultUpload,
            formItemConfig:{
                rules:[{ required: true, message: '上传文件不得为空!' }]
            },
            config:{
                maxCount:1,
                accept:'.xls, .xlsx'
            } 
        }],
        [{
            component:'upload',
            uploadConfig:{
                icon:FileZipOutlined,
                comment:'请点击/拖拽上传含pdf材料的zip文件',
            },
            formLabel:'applicationMaterialsFiles',
            className:style.defaultUpload,
            formItemConfig:{
                rules:[{ required: true, message: '上传文件不得为空!' }]
            },
            config:{
                maxCount:1,
                accept:'.zip'

            } 
        }],
    ]
    
    const isObjectFull=(object)=>{

    }
    
    

    const  value1 =ref<Moment>()
    const onChange = (test) => {
      console.log(test);
    };
    const onOpen=(status)=>{
        console.log(status)
    }
    const onFinish=(values: any)=>{
        console.log('Success:', values);
    }

    const submitCreation =(values: any)=>{
        form.title=titleContent.value
        createVotingDetailStore.saveFormState(form,{})
        console.log('[store数据]',createVotingDetailStore.form,createVotingDetailStore.getVotingDetailInfo)
        emits('setStepNum',stepNum+1)
    }


    const cancelCreation=()=>{
        router.push({path:`/create/voting/menu`})
    }


</script>

<template>
    <Card :className="style.container">
        <template v-slot:headerLeft>评审投票详细信息编辑</template>
        <div   :className="style.content">
            <a-form 
                layout="vertical" 
                :model="form"
                @finish="onFinish"
            >
                <div v-for="eachRow in formConfig" :className="style.eachRow">
                    <template v-for="(item) in eachRow">
                        <a-form-item 
                            :label="INPUT_LABLE_DIC[item.formLabel]" 
                            :className="item.className"
                            v-bind="item.formItemConfig? item.formItemConfig:{}"
                        >
                            <div 
                                v-if="item.component=='label'"
                            >{{item.value.value}}</div>
                            <a-input 
                                v-if="item.component=='input'"
                                v-model:value="form[item.formLabel]" 
                                :placeholder="`请输入${INPUT_LABLE_DIC[item.formLabel]}`" 
                                v-bind="item.config? item.config:{}"
                            />
                            <a-date-picker 
                                v-if="item.component=='date'"
                                v-model:value="form[item.formLabel]" 
                                :allowClear="false"
                                :placeholder="`请选择${INPUT_LABLE_DIC[item.formLabel]}`"
                                v-bind="item.config? item.config:{}"
                            />
                            <a-select
                                v-if="item.component=='select'"
                                v-model:value="form[item.formLabel]"
                                v-bind="item.config? item.config:{}"
                            >
                                <a-select-option v-for="(option) in item.options" :value="option.value">
                                    {{option.label}}
                                </a-select-option>
                            </a-select>
                            <div v-if="item.component=='upload'">
                                <a-upload-dragger
                                    v-model:file-list="form[item.formLabel]"
                                    v-bind="item.config? item.config:{}"
                                >
                                    <div :className="style.uploadContent">
                                        <div :className="style.uploadIcon">
                                            <!-- <component :is="item.uploadIcon==='zip'? FileZipOutlined:FileAddOutlined"  /> -->
                                            <component :is="item.uploadConfig?.icon? item.uploadConfig.icon:FileAddOutlined"/>
                                        </div>
                                        <p :className="style.uploadText">
                                            {{item.uploadConfig?.title? item.uploadConfig.title:`上传${INPUT_LABLE_DIC[item.formLabel]}材料`}}
                                            <p :className="style.commentText">{{item.uploadConfig?.comment? item.uploadConfig.comment:''}}</p>
                                        </p>
                                        
                                    </div>
                                    
                                </a-upload-dragger>
                            </div>

                        </a-form-item>
                    </template>
                </div>
                <div :className="style.buttonRow">
                    <a-form-item >
                    <a-button 
                        style="margin-left: 10px"
                        @click="cancelCreation"
                    >
                        取消
                    </a-button>
                    <a-button
                        :disabled="submitDisabled" 
                        type="primary" 
                        @click="submitCreation"
                    >下一步</a-button>
                    
                    </a-form-item>
                    <!-- <a-form-item v-if="submitDisabled"> * 请完成会议配置填写</a-form-item> -->
                </div>
            </a-form>
        </div>
    </Card>
</template>
