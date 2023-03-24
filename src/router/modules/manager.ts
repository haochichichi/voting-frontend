export default[
    {
        name:'createVotingMenu',
        path:'create/voting/menu',
        component:()=>import('/@/views/createVotingMenu/createVotingMenu.vue'),
        // redirect:'/login'
   },
   {
        path:'create/voting/detail',
        name:'createVotingDetail',
        component:()=>import('/@/views/createVotingDetail/createVotingDetail.vue'),
        // redirect:'/login'
    },
    {
        path:'current/voting/menu',
        name:'currentVotingMenu',
        component:()=>import('/@/views/currentVotingMenu/currentVotingMenu.vue')
    }
]