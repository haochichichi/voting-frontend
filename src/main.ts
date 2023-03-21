import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import {setupRouter} from './router'
import 'ant-design-vue/dist/antd.css'
import {createPinia} from 'pinia'

function bootstrap(){
    const app=createApp(App);
    const pinia =createPinia()
    setupRouter(app).use(pinia).use(Antd).mount('#voting-app')
}
bootstrap()
// createApp(App).use(Antd).mount('#voting-app')
