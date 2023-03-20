<script setup lang="ts">
import style from './style/defaultCard.module.scss'
import { defineProps,useSlots } from 'vue';
const props =defineProps(['className'])
const slots =useSlots()
</script>
<template>
    <div
        v-bind="{
            className: `${style.container} ${props.className?  props.className:''}`
        }" 
        >
        <div v-if="slots.headerLeft||slots.headerRight" :className="style.header">
            <slot name="headerLeft" ></slot>
            <slot name="headerRight" ></slot>
        </div>
        <slot v-else name="header" ></slot>
        <div :className="style.content">
            <slot />
        </div>
        
    </div>
</template>
