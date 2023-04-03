<script setup lang="ts">
    import style from './styles/frame.module.scss'
    import Frame from '/@/components/frame/frame.vue'
    import { ref,onMounted } from 'vue';
    import { UserOutlined ,PoweroffOutlined,SelectOutlined } from '@ant-design/icons-vue';
    import Menu from '/@/components/menu/defaultMenu.vue'
    // 目录配置信息
    import {MENU_CONFIG_LIST} from './utils/constant'
    // 用户信息初始化
    const userInfo=ref({})
    // 用户
    const selectedKeys1=ref<string[]>(['2'])
    const menuContent=ref([])

    onMounted(()=>{
        // 用户身份验证
        console.log('[身份验证]')
        userInfo.value.ukeyID='liangli@calt.casc'

        // 用户目录获取
        menuContent.value=MENU_CONFIG_LIST
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
        style:{ lineHeight: '64px' },
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
            我是表中
            <!-- <a-menu
                mode="horizontal"
                v-model:selectedKeys="selectedKeys1"
                :style="{ lineHeight: '64px' }"
                v-bind="menuConfig"
            >
                <a-menu-item 
                    v-for="item in menuContent"
                    key="item.key"
                >
                    <template #icon>  <component :is="item.icon? item.icon:MenuOutlined "/></template>
                    {{item.label}}
                </a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
                <a-sub-menu>
                <template #icon>
                    <setting-outlined />
                </template>
                <template #title>Navigation Three - Submenu</template>
                <a-menu-item-group title="Item 1">
                    <a-menu-item key="setting:1">Option 1</a-menu-item>
                    <a-menu-item key="setting:2">Option 2</a-menu-item>
                </a-menu-item-group>
                <a-menu-item-group title="Item 2">
                    <a-menu-item key="setting:3">Option 3</a-menu-item>
                    <a-sub-menu>
                            <template #icon>
                                <setting-outlined />
                            </template>
                            <template #title>Navigation Three - Submenu</template>
                            <a-menu-item-group title="Item 1">
                                <a-menu-item key="setting:1">Option 1</a-menu-item>
                                <a-menu-item key="setting:2">Option 2</a-menu-item>
                            </a-menu-item-group>
                            <a-menu-item-group title="Item 2">
                                <a-menu-item key="setting:3">Option 3</a-menu-item>
                                <a-menu-item key="setting:4">Option 4</a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>
                </a-menu-item-group>
                </a-sub-menu>
            </a-menu> -->
            <Menu
                v-bind="{
                    menuConfig,
                    menuList:menuContent
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