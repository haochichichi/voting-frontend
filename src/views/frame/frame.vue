<script setup lang="ts">
    import style from './styles/frame.module.scss'
    import Frame from '/@/components/frame/frame.vue'
    import { ref,onMounted,watch } from 'vue';
    import { UserOutlined ,PoweroffOutlined,SelectOutlined } from '@ant-design/icons-vue';
    import Menu from '/@/components/menu/defaultMenu.vue'
    import {useRouter, useRoute } from 'vue-router'
    // 目录配置信息
    import {MENU_CONFIG_LIST} from './utils/constant'
    // 用户信息初始化
    const userInfo=ref({})

    // 目录配置
    // const selectedKeys1=ref<string[]>(['2'])
    const props =defineProps(['menuItem','id'])
    const route = useRoute()
    const menuContent=ref([])
    const selectedKeys=ref<string[]>([''])

    onMounted(()=>{
        // 用户身份验证
        console.log('[身份验证]',props,route.params.menuItem)
        userInfo.value.ukeyID='liangli@calt.casc'

        // 用户目录获取
        menuContent.value=MENU_CONFIG_LIST
        selectedKeys.value=props.menuItem
    })

    // 登出
    const signOut=()=>{
        userInfo.value={}
    }

    const signIn=()=>{
        userInfo.value.ukeyID='liangli@calt.casc'
    }

    // 目录配置
    const menuConfig={
        theme:'dark',
        mode:'horizontal',
        style:{ lineHeight: '64px' ,flex:1},
    }
    

</script>

<template>
    <Frame>
        <template v-slot:logoContent>
            <div :className="style.logo">
                评审投票系统
            </div>
        </template>
        <template v-slot:headerContent>
            
            选择目录{{selectedKeys}}
            <Menu
                v-model="selectedKeys"
                v-bind="{
                    menuConfig,
                    menuList:menuContent,
                }"
            />
           
        </template>
        <template v-slot:headerRight >
            <div :className="style.userContainer">
                <template  v-if="userInfo.ukeyID">
                    <div :className="style.Signout"  @click="signOut"><PoweroffOutlined /></div>
                    <div :className="style.userInfo"><UserOutlined /> {{userInfo.ukeyID}}</div>
                </template>
                <div v-else  :className="style.Signin" @click="signIn">
                    <SelectOutlined />
                    登录
                </div>
            </div>
            
        </template>
        <template v-slot:content>
            <router-view/>
        </template>
    </Frame>
</template>