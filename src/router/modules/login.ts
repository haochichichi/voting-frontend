export default[
    {
        path:'/login',
        name:'login',
        component:()=>import('/@/components/HelloWorld.vue'),
        meta:{
            requireAuth:false
        },
        children:[
            {
                name:'home',
                path:'home',
                component:()=>import('/@/views/defaultPages/404.vue'),
                // redirect:'/login'
               
            },
            {
                name:'foo',
                path:'foo',
                component:()=>import('/@/views/defaultPages/404.vue'),
                // redirect:'/login'
               
            },
            {
                name:'bar',
                path:'bar',
                component:()=>import('/@/views/defaultPages/404.vue'),
                // redirect:'/login'
               
            }
        ]
    }
]