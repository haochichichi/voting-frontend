import {createRouter,createWebHistory} from 'vue-router'
import modules from './modules'
import usePermission from '/@/hooks/usePermission'

// 项目路径
let publicPath: any = import.meta.env.VUE_PUBLIC_PATH

// 项目路由
export const router = createRouter({
    history:createWebHistory(),
    routes:[...modules],
    strict: true, // applies to all routes
})

// 路由访问鉴权
router.beforeEach((to:any,from:any,next:any)=>{
    console.log('路由访问鉴权',to,from,next)
    // 登录态检查
   
    // 角色权限检查
    // const {hasRouterPermission,getRedirectPath}=usePermission()
    // const isValid = hasRouterPermission(to.path)
    // const redirectPath=getRedirectPath();

    
    next()
    // next({path:'/login'})

})

export const setupRouter=(app:App<Element>)=>{
    return app.use(router)
}