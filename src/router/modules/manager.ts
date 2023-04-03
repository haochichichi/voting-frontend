export default[
    {
        name:'createVotingMenu',
        path:'create/voting/menu',
        component:()=>import('/@/views/createVotingMenu/createVotingMenu.vue'),
        props:{menuItem:'createVoting',id:'1111'},
        // redirect:'/login'
   },
   {
        path:'create/voting/detail',
        name:'createVotingDetail',
        component:()=>import('/@/views/createVotingDetail/createVotingDetail.vue'),
        props:{menuItem:'createVoting'},
        // redirect:'/login'
    },
    {
        path:'current/voting/menu',
        name:'currentVotingMenu',
        component:()=>import('/@/views/currentVotingMenu/currentVotingMenu.vue'),
        props:{menuItem:'manageVoting'},
    }
]