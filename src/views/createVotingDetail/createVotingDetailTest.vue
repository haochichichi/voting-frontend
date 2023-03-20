<script setup lang="ts">
    import {ref} from 'vue'
    import style from './styles/createVotingDetail.module.scss'
    // const changeTheme=(theme)=>{

    // }
    const theme=ref('red')
    const themeClass=()=>{
      console.log('theme',theme)
      return `theme-${theme}`
    }
</script>
<template>
    <div class="app-root" v-bind="{
      className:style[`theme-${theme}`]
    }" >
    <div :className="style['app-container']">
      <select v-model="theme">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  </div>
</template>

<!-- <style lang="scss" scoped>
@import './styles/theming';
.app-container {
  @include themify($themes) {
    color: themed('font-color');
  }
}
</style> -->