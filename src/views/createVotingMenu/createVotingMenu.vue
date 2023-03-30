<script setup lang="ts">
    import {ref} from 'vue'
    import style from './styles/createVotingMenu.module.scss'
    import MenuCard from './components/menuCard.vue'
    import { onMounted } from 'vue';
    import {getSelectedMenuList} from './utils/utils'
    // MOCK数据
    import {MOCK_MENU,MOCK_ENUMS} from './utils/mockData'
    
    const menuList=ref([])
    const enums=ref([])
    onMounted(() => {
        console.log('[接口请求] 获取目录、获取enums')
        menuList.value=MOCK_MENU
        enums.value=MOCK_ENUMS
    })
</script>
<template>
    <div :className="style.container">
            <MenuCard 
                v-for="menu in menuList"
                :menuList="getSelectedMenuList([],menu)"
                :className="style.menuCard"
                :enums="enums"
                v-bind="$attrs"
            />
            <!-- <MenuCard :className="style.menuCard"/>
            <MenuCard :className="style.menuCard"/> -->
    </div>
</template>