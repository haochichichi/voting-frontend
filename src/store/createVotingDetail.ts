import {defineStore} from 'pinia'

// 投票实例创建
export const useCreateVotingDetailStore=defineStore("createVotingDetail",{
    state:()=>{
        return{
            // categoryValue:'????', //院/火箭
            // createdBy:'???',
            // reviewTypePath:'',
            // reviewTypeCode:'',
            form:{
                // reviewYear:10,
                // title:'投票名称',
                // targetCount:22,
                // expertCount:30,
                // meetingRoomCode:'111',
                // votingTemplateFiles:[],
                // votingTemplateObject:{},
                // applicationMaterialsFiles:[],
                // applicationMaterialpdfFileList:[],
            },
            others:{

            }

            // reviewYear:10,
            // title:'投票名称',
            // targetCount:22,
            // expertCount:30,
            // meetingRoomCode:'111',
            // votingTemplateFiles:[],
            // votingTemplateObject:{},
            // applicationMaterialsFiles:[],
            // applicationMaterialpdfFileList:[],
        }
    },
    getters:{
        getFormState(state):any{
            return {
                ...state.others,
                ...state.form,
            }
        }
        // getPdfFileList(state):any[]{
        //     const result=[1,1,1]
        //     if (state.applicationMaterialsFiles.length==0){
        //         return result
        //     }
        //     // 解压applicationMaterialsFiles[0]

        //     return result
        // }
        
    },
    actions:{
        saveFormState(form,others){
            this.form=form
            this.others=others
        }
    }
})