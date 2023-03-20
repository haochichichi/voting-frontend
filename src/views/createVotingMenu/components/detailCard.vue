<script setup lang="ts">
import style from '../styles/detailCard.module.scss'
import {ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const content='暂无数据'
const tagList=ref({
    'test':[
        {
            title:'111',
            code:'222',
        },
        {
            title:'333',
            code:'444',
        },
        {
            title:'333',
            code:'444',
        },
        {
            title:'333',
            code:'444',
        },
        {
            title:'333',
            code:'444',
        },
        {
            title:'333',
            code:'444',
        },
    ]
})

 const onTagClick=(e,item)=>{
    console.log(e,item)
    router.push({path:`/create/voting/detail`,query:{...item}})
 }

</script>
<template>
    <div :className="style.container">
        <div  :className="style.selector" >
            选择文本
            <div>选择器</div>
        </div>
        <div 
            v-bind="{
                className:style.tagList,
                style: Object.keys(tagList).length===0? {justifyContent:'center'}:{}
        }">
            <template v-if="Object.keys(tagList).length>0" >
                <div 
                    :className="style.eachRow" 
                    v-for="(value,key,index) in tagList"
                >
                    <button 
                        v-for="item in value"
                      
                        @click="(event)=>onTagClick(event,item)"
                    >{{item.title}}</button>  
                </div>
                <div :className="style.eachRow">
                    <button>按钮</button>  
                </div>
            </template>
            <a-empty v-else :description="content"/>
        </div>
       
    </div>
    
</template>
