<script setup lang="ts">
import { ref } from 'vue'
import {useFullscreen} from '/@packages/headless'
import {useRouter, useRoute } from 'vue-router'

// 路由参数获取
const router = useRouter()
const route = useRoute()


defineProps<{ msg: string }>()
 console.log('???',useFullscreen)
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}{{route.params.id}}</h1>
<!-- {{test}} -->
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  111
  <!-- 点击跳转路由 -->
  <url>
    <li><router-link :to="{name:'home'}">home</router-link></li>
    <li><router-link :to="{name:'foo'}">foo</router-link></li>
    <li><router-link :to="{name:'bar',params:{id:23}}">bar</router-link></li>
  </url>
  <router-view></router-view>
  222
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
