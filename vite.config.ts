import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import {fileURLToPath,URL} from 'node:url'
import {resolve} from 'path'

function pathResolve(dir:string){
  return resolve(process.cwd(),'.',dir)
}

// https://vitejs.dev/config/
// npm install @vitejs/plugin-vue-jsx --save-dev
export default defineConfig({
  plugins: [vue(),vueJsx()],
  resolve:{
    alias:
    // {
    //   '@':fileURLToPath(new URL('./src',import.meta.url))
    // }
    [
      // /@/xxx => src/xxx
      {
        find:/\/@\//,
        replacement:pathResolve('src')+'/'
      },{
        find:/@vue3-common-packages\//,
        replacement:pathResolve('packages')+'/'
      },{
        find:/\/@packages\//,
        replacement:pathResolve('packages')+'/'
      }
    ]
  },
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled:true
      }
    }
  }
})
