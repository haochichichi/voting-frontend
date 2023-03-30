import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import STable from '@surely-vue/table';
import {setupRouter} from './router'
// import 'ant-design-vue/dist/antd.css'
// import '@surely-vue/table/dist/index.less'
// import '~ant-design-vue/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import '/@/styles/antTheme.less'; // 用于覆盖上面定义的变量
// import '/@/styles/antTheme.scss'; 
import {createPinia} from 'pinia'

function bootstrap(){
    const app=createApp(App);
    const pinia =createPinia()
    setupRouter(app).use(pinia).use(Antd).use(STable).mount('#voting-app')
}
bootstrap()
// createApp(App).use(Antd).mount('#voting-app')
