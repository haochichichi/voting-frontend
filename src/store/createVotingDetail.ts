import {defineStore} from 'pinia'

// 选票创建表格
export const useCreateVotingDetailStore=defineStore("createVotingDetail",{
    state:()=>{
        return{
            categoryValue:'????',
            createdBy:'???',

            reviewTypePath:'',
            reviewTypeCpde:'',

            reviewYear:10,
            title:'投票名称',
            targetCount:22,
            expertCount:30,
            meetingRoomCode:'111',
            votingTemplateFiles:[],
            votingTemplateObject:{},
            applicationMaterialsFiles:[],
            applicationMaterialpdfFileList:[],
        }
    },
    getters:{
        getPdfFileList(state):any[]{
            const result=[]
            if state.applicationMaterialsFiles.length==0{
                return result
            }
            return result
        }
        
    },
    actions:{

    }
})