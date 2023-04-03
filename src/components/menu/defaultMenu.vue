<!-- 可配置目录 -->
<script setup lang="ts">
    import {ref, onMounted} from 'vue'
    import { UserOutlined ,PoweroffOutlined,MenuOutlined } from '@ant-design/icons-vue';
    
     const props =defineProps(['menuConfig','menuList'])
     const current = ref<string[]>(['mail']);
     onMounted(() => {
        console.log('[目录配置]',props)
     })
</script>
<template>
    <a-menu 
        v-model:selectedKeys="current"
        v-bind="props.menuConfig"
    >
    <template v-for="menu in props.menuList">
        <a-menu-item  v-if="menu.hrefConfig">
            <a 
                v-bind="menu.hrefConfig"
            >
                {{menu.label||'未命名'}}
            </a>
        </a-menu-item>
        <a-menu-item v-else-if="menu.routerLink">
            <router-link :to="menu.routerLink">
                {{menu.label||'未命名'}}
            </router-link>
        </a-menu-item>
        <a-sub-menu v-else-if="menu.children?.length>0">
            <template v-if="menu.icon" #icon>
                <component :is="menu.icon? menu.icon:MenuOutlined "/>
            </template>
            <template #title>{{menu.label||'未命名'}}</template>
            <template v-for="item in menu.children">
                <a-menu-item-group v-if="item.children?.length>0" title="item.title">
                </a-menu-item-group>
            </template>
        </a-sub-menu>
        <a-menu-item v-else :key="menu.key">
            {{menu.label||'未命名'}}
        </a-menu-item>
    </template>
       
    </a-menu>
</template>