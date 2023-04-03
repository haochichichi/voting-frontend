<!-- 可配置目录 -->
<script setup lang="ts">
    import {ref, watch, onMounted} from 'vue'
    import { UserOutlined ,PoweroffOutlined,MenuOutlined } from '@ant-design/icons-vue';
    import SubMenu from './subMenu.vue'
    
     const props =defineProps(['menuConfig','menuList','modelValue'])
     const emit =defineEmits(['update:modelValue'])
     const current = ref<string[]>(props.modelValue);
     onMounted(() => {
        console.log('[目录配置]',props)
     })
     watch(
        current,
        (newValue,oldValue)=>{
            console.log('[变量变化]',newValue,oldValue)
            emit("update:modelValue", newValue)
        }
     )
</script>
<template>
    <a-menu 
        v-model:selectedKeys="current"
        v-bind="props.menuConfig"
    >
        <SubMenu :menuList="props.menuList" />
    </a-menu>
</template>