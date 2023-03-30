<script setup lang="ts">
import style from './style/defaultCard.module.scss'
import { defineProps,useSlots } from 'vue';
const props =defineProps(['className','logoClassName','disableHeadLogo'])
const slots =useSlots()
</script>
<template>
    <div
        v-bind="{
            className: `${style.container} ${props.className?  props.className:''}`
        }" 
        >
        <div v-if="slots.headerLeft||slots.headerRight" :className="style.header">
            <div :className="style.leftContainer">
                <div
                    v-if="!props.disableHeadLogo" 
                    v-bind="{
                        className: `${style.blueLogo} ${props.logoClassName?  props.logoClassName:''}`
                    }" 
                />
                <slot name="headerLeft" ></slot>
            </div>
           
            <slot name="headerRight" ></slot>
        </div>
        <slot v-else name="header" ></slot>
        <div :className="style.content">
            <slot />
        </div>
        
    </div>
</template>
