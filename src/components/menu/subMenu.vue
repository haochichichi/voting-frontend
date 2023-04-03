<script>
    import {ref, onMounted} from 'vue'
    import { UserOutlined ,PoweroffOutlined,MenuOutlined } from '@ant-design/icons-vue';
    
</script>
<template>
    <template v-for="menu in props.menuList">
        <a-menu-item  v-if="menu.hrefConfig">
            <a 
                v-bind="menu.hrefConfig"
            >
                <template v-if="menu.icon" #icon>
                    <component :is="menu.icon? menu.icon:MenuOutlined "/>
                </template>{{menu.label||'未命名'}}
            </a>
        </a-menu-item>
    </template>
</template>