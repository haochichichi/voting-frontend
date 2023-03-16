<script setup lang="ts">
import style from '../style/listCard.module.scss'
</script>
<template>
    <div :className="style.container">
        <div>组件名称</div>
        <div>装饰logo</div>
        <div :className="style.container"> 
            <button :className="style.button">button</button>
            <button :className="style.button">button</button>
            <button :className="style.button">button</button>
            <button :className="style.button">button</button>
            <button :className="style.button">button</button>
            <button :className="style.button">button</button>
        </div>
    </div>
</template>
