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

    const YEAR_DEFAULT_FORMATE='YYYY'
    const router = useRouter()
    const {stepNum,createVotingDetailStore} =defineProps(['stepNum','createVotingDetailStore'])
    const emits = defineEmits(['setStepNum'])
    const {form, getFormState,saveFormState} = storeToRefs(createVotingDetailStore) //实现响应式
    

    onMounted(() => {
        // 初始化数据
        console.log('[store数据]',createVotingDetailStore.title)
        createVotingDetailStore.form.reviewYear=dayjs(`${new Date()}`,YEAR_DEFAULT_FORMATE)
    })



    // 动态计算是否全部填写完成
    const submitDisabled = computed(()=>{
        // return !(form.title&&form.reviewYear)
        let result=false

        return result
    })

    // 动态计算标题
    const titleContent=computed(()=>{
        let result='未命名'
        return result
        // return `${form.targetCount}`
    })

    // const form: UnwrapRef<form> = reactive({
    //     reviewYear: ref<Dayjs>(dayjs(`${new Date()}`,YEAR_DEFAULT_FORMATE)),
    // });

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
            formLable:'reviewYear',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
            config:{
                format:'YYYY',
                picker:'year',
            }
            
        },{
            component:'lable',
            formLable:'title',
            className:style.titleInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
            value:titleContent,
            config:{
                bordered:false,
                disabled:true,
                value:titleContent.value,
            }
        }],
        [{
            component:'input',
            formLable:'targetCount',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
        },{
            component:'input',
            formLable:'expertCount',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
        },{
            component:'select',
            options:meetingRoomOptions,
            formLable:'meetingRoomCode',
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
            formLable:'votingTemplateFiles',
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
            formLable:'applicationMaterialsFiles',
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
        console.log(form);
        createVotingDetailStore.form.title=titleContent.value
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
                            :label="INPUT_LABLE_DIC[item.formLable]" 
                            :className="item.className"
                            v-bind="item.formItemConfig? item.formItemConfig:{}"
                        >
                            <div 
                                v-if="item.component=='lable'"
                            >{{item.value.value}}</div>
                            <a-input 
                                v-if="item.component=='input'"
                                v-model:value="form[item.formLable]" 
                                :placeholder="`请输入${INPUT_LABLE_DIC[item.formLable]}`" 
                                v-bind="item.config? item.config:{}"
                            />
                            <a-date-picker 
                                v-if="item.component=='date'"
                                v-model:value="form[item.formLable]" 
                                :placeholder="`请选择${INPUT_LABLE_DIC[item.formLable]}`"
                                v-bind="item.config? item.config:{}"
                            />
                            <a-select
                                v-if="item.component=='select'"
                                v-model:value="form[item.formLable]"
                                v-bind="item.config? item.config:{}"
                            >
                                <a-select-option v-for="(option) in item.options" :value="option.value">
                                    {{option.label}}
                                </a-select-option>
                            </a-select>
                            <div v-if="item.component=='upload'">
                                <a-upload-dragger
                                    v-model:file-list="form[item.formLable]"
                                    v-bind="item.config? item.config:{}"
                                >
                                    <div :className="style.uploadContent">
                                        <div :className="style.uploadIcon">
                                            <!-- <component :is="item.uploadIcon==='zip'? FileZipOutlined:FileAddOutlined"  /> -->
                                            <component :is="item.uploadConfig?.icon? item.uploadConfig.icon:FileAddOutlined"/>
                                        </div>
                                        <p :className="style.uploadText">
                                            {{item.uploadConfig?.title? item.uploadConfig.title:`上传${INPUT_LABLE_DIC[item.formLable]}材料`}}
                                            <p :className="style.commentText">{{item.uploadConfig?.comment? item.uploadConfig.comment:''}}</p>
                                        </p>
                                        
                                    </div>
                                    
                                </a-upload-dragger>
                            </div>

                        </a-form-item>
                    </template>
                </div>
                <a-form-item :className="style.eachRow">
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
            </a-form>
        </div>
    </Card>
</template>
