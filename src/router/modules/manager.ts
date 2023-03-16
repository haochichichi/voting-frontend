export default[
    {
        name:'createVotingMenu',
        path:'create/voting/menu',
        component:()=>import('/@/views/createVotingMenu/createVotingMenu.vue'),
        // redirect:'/login'
   },
   {
        name:'voting',
        path:'votingList',
        component:()=>import('/@/views/menu/votingList.vue'),
        // redirect:'/login'
    },
]