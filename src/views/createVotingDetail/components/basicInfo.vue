<script setup lang="ts">
    import style from '../styles/votingInfo.module.scss'
    import { Moment } from 'moment';
    import {Card} from '@vue3-common-packages/components'
    import {useInputNumberFormater} from '@vue3-common-packages/headless'
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
    import{MEETING_ROOM_MENU} from '../utils/mockData'
   

    const YEAR_DEFAULT_FORMATE='YYYY'
    const router = useRouter()
    const {stepNum,createVotingDetailStore} =defineProps(['stepNum','createVotingDetailStore'])
    const emits = defineEmits(['setStepNum'])
    const {form:storageForm, getFormState,saveFormState} = storeToRefs(createVotingDetailStore) //实现响应式
    const menuList=ref([])
    const enums=ref([])
    const meetingRoomOptions=ref(MEETING_ROOM_MENU)

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

        // 动态处理输入限制配置
        formConfig.value=formConfig.value.map((row)=>{
            const newRow=row.map(item=>{
                if(item.component==='input'&&item.numberFormater!=undefined){
                    const {inputValue,onBlur}=useInputNumberFormater({numberType:item.numberFormater})
                    form[item.formLabel]=inputValue
                    item.config=item.config?{...item.config,onBlur}:{onBlur}
                }
               return item
            })
            return newRow
        })
        // 时间默认为当前时间、标题提供初始化值
        form.reviewYear=dayjs(`${new Date()}`,YEAR_DEFAULT_FORMATE)
        form.meetingRoomCode=meetingRoomOptions.value[0]?.value
        form.title=getTitleContent(form.reviewYear.year(),initMenuInfo.attrLabels,initMenuInfo.menuLabels)
    })

    // 动态计算是否全部填写完成
    const submitDisabled = computed(()=>{
        const countString=`!(${isFullInput(formConfig.value)})`
        return eval(countString)
    })

    // 判断当前可选日期
    const getDisableDate =(current:any)=>{
        return current && current < dayjs().subtract(1, 'days')
    }

    // 获取评审投票名称
    const getTitleContent=(year,attrs,menus)=>{
        const menuTitleList=[menus.shift(),menus.pop()]
        return `${year}年${attrs? attrs.join(''):''}${menuTitleList.filter(item=>item).join('')}`
    }

    

    // 文件上传拦截&解析
    const beforeUpload = async (type,uploadItem: UploadFile<unknown>): Promise<boolean> => {
        // 坑：必须要返回一个 Promise，promise 中 必须返回false 才能阻止上传，通过校验必须返回true和 resolve 否则会阻止上传
        const {event , file, fileList}=uploadItem
        console.log('[文件阻止上传]',type, uploadItem,event , file, fileList)

        event.target.onProgress({ percent: (0.1) * 100 })
        event.target.onSuccess();
        // return new Promise((resolve,reject) => {
        //     const { supportFileType, maxSize, aspectUnit } = props;
        //     const { size = 0, name = "" } = file || {};
        //     return false;
           

        //     // if (!isFormatValidate(name, supportFileType)) {
        //     //     message.error("请上传支持的文件格式!");
        //     //     return false;
        //     // }

        //     // const isSizeValidate: boolean = size <= maxSize; // 文件大小判断
        //     // if (!isSizeValidate) {
        //     //     const msg = `文件最大不超过${getSizeByByte(maxSize, aspectUnit)}`;
        //     //     message.error(msg);
        //     //     console.log("msg", msg);
        //     //     return false;
        //     // }
        //     // fileList.value = [...fileList.value, file];
        //     // resolve(true);
        //     // return true;
        // });
    }

    // 动态计算 评审投票名称
    // const titleContent=computed(()=>{
    //     let result='未命名'
    //     // return result
    //     if (form.baseInfo&&form.reviewYear){
    //         result=`${form.baseInfo?.attrLabels? form.baseInfo.attrLabels.join(''):''}${form.reviewYear.year()}年${form.baseInfo?.menuLabels? form.baseInfo.menuLabels.join(''):''}`
    //     }
    //     return result
    // })

   

    // const form=createVotingDetailStore.form

    const mode1 = ref<string>('year');

    const formConfig=ref([
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
                disabledDate:getDisableDate,
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
            numberFormater:'positive-float',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
            config:{
            }
        },{
            component:'input',
            formLabel:'expertCount',
            numberFormater:'positive',
            className:style.defaultInput,
            formItemConfig:{
                rules:[{ required: true, message: '输入不得为空!' }]
            },
        },{
            component:'select',
            options:meetingRoomOptions.value,
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
                accept:'.xls, .xlsx',
                onChange:beforeUpload.bind(this,'excel')
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
    ])
    
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
                layout="inline" 
                :model="form"
                @finish="onFinish"
            >
                <div v-for="eachRow in formConfig" :className="style.eachRow">
                    
                        <a-form-item 
                            v-for="(item) in eachRow"
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
