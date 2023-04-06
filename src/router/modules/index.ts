import login from './login';
import defaultPages from './defaultPages'
import manager from './manager'
import Vue from 'vue'

const children:any =[
    ...manager
]
console.log(children)
export default [
    {
        path:'/',
        name:'base',
        component:()=>import('/@/views/frame/frame.vue'),
        // components:{
        //     default:import('/@/views/headBar/headBar.vue'),
        // },
        meta:{
            requireAuth:true,
        },
        children:children,
    },
    {
        path:'/test',
        name:'test',
        component:()=>import('/@/components/fullScreen/FullScreen.vue')
    },
    ...login,
    ...defaultPages,
]