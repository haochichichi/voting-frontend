// 兜底页路由
export default[{
    name:'NotFound',
    path:'/:pathMatch(.*)*',
    component:()=>import('/@/views/defaultPages/404.vue'),
    // redirect:'/login'
   
}]