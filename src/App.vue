<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import FullScreen from '/@/components/fullScreen/FullScreen.vue'
import style from '/@/styles/global.module.scss'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
const local=zhCN

</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <FullScreen /> -->
  <a-config-provider :local="local">
    <!-- ant design 配置为中文环境 -->
    <div :className="style.global">
      <router-view />
    </div>
  </a-config-provider>
</template>
