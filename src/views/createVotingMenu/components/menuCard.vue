<script setup lang="ts">
    import {ref,defineProps} from 'vue'
    import style from '../styles/menuCard.module.scss'
    import '/@/styles/common.scss'
    import { onMounted } from 'vue';
    import ListCard from './listCard.vue'
    import {Card} from '@vue3-common-packages/components'
    import {getSelectedMenuList} from '../utils/utils'
    const {menuList,className}=defineProps(['menuList','className'])
    const menu=ref({})
    // import {MOCK_MENU} from '../utils/constant'
    // const menuList=ref([])
    onMounted(() => {
        if(menuList.length>0){
            menu.value=menuList[menuList.length-1]
        }
        // console.log('卡片处理',menuList)
    })
</script>
<template>
        <Card :className="`${style.container} ${className}`">
            <template v-slot:headerLeft>
                    <!-- <div :className="style.logo" />   -->
                <div :className="style.titleContent">{{menu?.label? menu.label:'未命名'}}</div>
            </template>
            <div
                v-if="menu?.children?.length>0" 
                :className="style.content"> 
                <div 
                    v-for="list in menu.children?menu.children:[]"
                    :className="style.listContent"
                >
                    <ListCard 
                        :menuList="getSelectedMenuList(menuList,list)"
                        v-bind="$attrs"
                    />
                </div>
            </div>
            <div :className="style.empty" v-else>
                <a-empty/>
            </div>
        </Card>
</template>