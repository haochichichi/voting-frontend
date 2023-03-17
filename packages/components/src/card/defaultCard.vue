<script>
import style from './style/defaultCard.module.scss'
const props =defineProps(['modelValue'])
</script>
<template>
    <div
        v-bind="{
            className: props.modelValue?.className?  props.modelValue.className:style.container
        }" 
        >
        <slot />
    </div>
</template>
