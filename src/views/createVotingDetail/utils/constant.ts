export const INPUT_LABLE_DIC={
    'reviewYear':'会议年度',
    'title':"评审投票名称",
    'targetCount':'指标数',
    'expertCount':'评审专家数',
    'meetingRoomCode':'会议室',
    'votingTemplateFiles':'参评人员',
    'applicationMaterialsFiles':'申报文件',
}
export const workbookArrayToTable=(sheetObj):Object=>{
    const columns=[]
    const dataSource=sheetObj.sheetData
    sheetObj.sheetHeader.map((item,key)=>{
        columns.push({
            title:item,
            dataIndex:item,
            key:item,
        })
    })
    return {columns,dataSource}
}

export const displayTableTag=()=>{
    let domArr = document.getElementsByTagName('div')
        for (let i = 0; i < domArr.length; i++) {
            if (['Unlicensed Product'].includes(domArr[i].innerText)) {
            domArr[i].remove()
            }
        }
        const surelyBody=document.getElementsByClassName('surely-table-body')
        if(surelyBody.length>0){
            let domArr2 = surelyBody[0].getElementsByTagName("div")
        for (let i=0;i<domArr2.length;i++){
            if (['Powered by Surely Vue'].includes(domArr2[i].innerText)) {
            domArr2[i].innerText = ''
            }
        }
        }
}