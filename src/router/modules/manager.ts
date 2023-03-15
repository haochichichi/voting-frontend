export default[
    {
        name:'create',
        path:'createMenu',
        component:()=>import('/@/views/menu/createMenu.vue'),
        // redirect:'/login'
   },
   {
        name:'voting',
        path:'votingList',
        component:()=>import('/@/views/menu/votingList.vue'),
        // redirect:'/login'
    },
]