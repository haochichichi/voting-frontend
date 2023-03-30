<script setup lang="ts">
import style from '../styles/detailCard.module.scss'
import {ref,reactive,onMounted,computed,useAttrs} from 'vue'
import { useRouter } from 'vue-router'
import {getSelectedMenuList,getDetailCardGroupList} from '../utils/utils'

const {menuList}=defineProps(['menuList'])
const tagList = ref([])
const attributeConfigList =ref([])
const attributeSelect: UnwrapRef<form> = reactive({});
const router = useRouter()
const attrs = useAttrs()
const enums=ref([])

// 动态计算是否允许进入会议配置详情页
const submitDisabled = computed(()=>{
    // return !(form.title&&form.reviewYear)
    for(let key in attributeConfigList.value){
        const item=attributeConfigList.value[key]
        if(!attributeSelect[item.code]){return true}
    }
    return false
})
onMounted(() => {
    if(menuList.length>0){
        enums.value=attrs.enums? attrs.enums:[]
        const menu=menuList[menuList.length-1]
        tagList.value=getDetailCardGroupList(menu.children?menu.children:[])
        
        // 读取可选属性列表
        if (menu.categoryCode){
            // TODO: 支持多个可选属性
            attributeConfigList.value=enums.value.filter((item)=>item.code===menu.categoryCode)
            // 赋值默认值
            attributeConfigList.value.forEach(item=>{
                attributeSelect[item.code]=ref(item.dictionaries?.length>0? item.dictionaries[0].code:undefined)
            })
        }
        // menu.value=menuList[menuList.length-1]
    }
})

 const onTagClick=(e,item)=>{
    const selectedResult=getSelectedMenuList(menuList,item)
    const selectIDs=selectedResult.map(item=>item.id)
    const query={
        ids:selectIDs.join(',')
    }
    Object.keys(attributeSelect).forEach(key=>{
        query[key]=attributeSelect[key]
    })
    // console.log('选择结果',selectedResult,item,attributeSelect,)
    router.push({path:`/create/voting/detail`,query})
 }

</script>
<template>
    <div :className="style.container">
        <div  
            v-if="attributeConfigList.length>0"
            :className="style.selector" 
        >
            <template v-for="attribute in attributeConfigList">
                选择{{attribute.label}}
                <a-select
                    v-model:value="attributeSelect[attribute.code]"
                >
                    <a-select-option v-for="(option) in attribute.dictionaries" :value="option.code">
                        {{option.label}}
                    </a-select-option>
                </a-select>
            </template>
        </div>
        <div 
            v-bind="{
                className:`${style.tagList} ${tagList.length===0? style.empty:''}`,
        }">
            <template v-if="tagList.length>0" >
                <div 
                    :className="style.eachRow" 
                    v-for="(row) in tagList"
                >
                    <a-button 
                        :disabled="submitDisabled" 
                        v-for="item in row"
                        @click="(event)=>onTagClick(event,item)"
                    >{{item.label?item.label:'未命名'}}</a-button>  
                </div>
            </template>
            <a-empty v-else />
        </div>
       
    </div>
    
</template>
