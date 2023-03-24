
import {getFileTypeFromArrayBuffer} from '@vue3-common-packages/utils'
// 将excel数据转为table显示格式
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

const getPdfFileID=(rawName)=>{
    if(!rawName){return rawName}
    const fileName=rawName.split('/').pop()
    return fileName.split('.').shift()
}
const getPdfFileName=(rawName:String):Stirng=>{
    if(!rawName){return rawName}
    return rawName.split('/').pop()
}

// 处理解压文件，返回pdf文件列表
export const fileListToPdfList= (fileList)=>{
    const result=[]
    fileList.forEach( (item)=>{
        if (getFileTypeFromArrayBuffer(item.arrayBuffer)==='pdf'){
            const title=getPdfFileName(item.raw?.name)
            const id=Number(getPdfFileID(title))
            result.push({
                rawFile:item,
                title,
                id,
            })
        }
    })
    return result
}

// 删除水印
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



