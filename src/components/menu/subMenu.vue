<script setup lang="ts">
     import {ref, watch, onMounted} from 'vue'
    import { MenuOutlined } from '@ant-design/icons-vue';
    import SubMenu from './subMenu.vue'
    const props =defineProps(['menuConfig','menuList','modelValue'])
   
</script>
<template>
    <template v-for="menu in props.menuList">
        <a-sub-menu v-if="menu.type==='subMenu'">
            <template v-if="menu.icon" #icon>
                <component :is="menu.icon? menu.icon:MenuOutlined "/>
            </template>
            <template #title>{{menu.label||'未命名'}}</template>
            <!-- 遍历子节点 -->
            <SubMenu :menuList="menu.children" />
        </a-sub-menu>
        <a-menu-item-group v-else-if="menu.type==='groupMenu'" :title="menu.label">
            <!-- 遍历子节点 -->
            <SubMenu :menuList="menu.children" />
        </a-menu-item-group>
        <a-menu-item  v-else :key="menu.key">
            
            <template v-if="menu.hrefConfig">
                <a 
                    v-bind="menu.hrefConfig"
                >
                    <component v-if="menu.icon" :is="menu.icon? menu.icon:MenuOutlined "/>
                    {{menu.label||'未命名'}}
                </a>
            </template>
            <template v-else-if="menu.routerLink">
                <router-link :to="menu.routerLink">
                    <component v-if="menu.icon" :is="menu.icon? menu.icon:MenuOutlined "/>
                    {{menu.label||'未命名'}}
                </router-link>
            </template>
            <template v-else>
                <component v-if="menu.icon" :is="menu.icon? menu.icon:MenuOutlined "/>
                {{menu.label||'未命名'}}
            </template>
        </a-menu-item>
    </template>
</template>