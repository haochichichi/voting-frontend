
import { ChromeFilled } from '@ant-design/icons-vue'
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

// 判断属性是否读取到底
export const isValidAttrPath=(attrPath)=>{
    for (let key=0;key<attrPath.length;key++){
        const attr=attrPath[key]
        if(!attr || (key==attrPath.length-1&&attr.dictionaries)){return false}
    }
    return true
}

/**
 * @description 递归获取所选属性
 * @param {Array} enums path头部id可检索数组
 * @param {Array} path 所选属性id路径数组
 */
export const readSelectedAttr=(enums,idPath)=>{
    if(!idPath||idPath.length===0){return []}
    if(!enums||enums.length===0){
        return [null]
    }
    const code=idPath.shift()
    const node=enums.find(item=>item.code===code)
    return [node,...readSelectedAttr(node?.dictionaries? node.dictionaries:null,idPath)]
}

// 判断会议目录是否读取到底
export const isValidMenuPath=(menuPath)=>{
    for (let key=0;key<menuPath.length;key++){
        const menu=menuPath[key]
        if(!menu || (key==menuPath.length-1&&menu.children)){return false}
    }
    return true
}


/**
 * @description 递归获取所选目录
 * @param {Array} enums 属性目录
 * @param {Array} path 所选属性id路径数组
 */
export const readSelectedMenu=(enums,params,menus,idPath)=>{
    
    if(!idPath||idPath.length===0){return []}
    if(!menus||menus.length===0){
        return [null]
    }
    
    const id=Number(idPath.shift())
    const node=menus.find(item=>item.id===id)
    
    if(!node){return [null]}
    const nodeObj={node}
    if(node.categoryCode){
        const selectedAttrs=readSelectedAttr(enums,[node.categoryCode,params[node.categoryCode]])
        if(!isValidAttrPath(selectedAttrs)){return [null]}
        nodeObj.selectedAttrs=selectedAttrs
    }
    console.log('[看看遍历]',node,enums,params,menus,idPath)
    return [nodeObj,...readSelectedMenu(enums,params,node.children,idPath)]
}

// 获取节点名称
export const getMenuLabels=(menuPath)=>{
    return menuPath.map(item=>item.node.label)
}

// 获取所选属性名称
export const getAttrLabels=(menuPath)=>{
    const result=[]
    menuPath.forEach(item=>{
        if(item.selectedAttrs){
            const attr=item.selectedAttrs[item.selectedAttrs.length-1]
            if(attr?.label){result.push(attr.label)}
        }
    })
    return result
}

// 获取会议可选列表
export const getMeetingRoomInfo=(rawData)=>{
    const meetingRoomDic={}
    const meetingSelectedList=[]
    rawData.forEach(item=>{
        meetingRoomDic[item.code]=item
        meetingSelectedList.push({
            value:item.code||'',
            label:item.label||'',
        })
    })
    return {meetingRoomDic,meetingSelectedList}
}

// 所选会议模板数据处理
export const getSelectedMeetingTemplate=(enums,menu,params)=>{
    let isValid=false
    const idPath=params.ids? params.ids.split(','):[]
    if(idPath.length===0){return {isValid}}
    const menuPath=readSelectedMenu(enums,params,menu,idPath)
    if(!isValidMenuPath(menuPath)){return {isValid}}

    const menuLabels=getMenuLabels(menuPath.slice(1,menuPath.length))
    const attrLabels=getAttrLabels(menuPath)
    isValid=true
    return {
        menuPath,
        isValid,
        menuLabels,
        attrLabels,
    }
}

// 判断配置输入项是否为空
export const isFullInput=(configList)=>{
    const requierd=[]
    let inputList=[]
    configList.forEach(row=>{
        inputList=[...inputList,...row]
    })
    for(let key in inputList){
        const config=inputList[key]
        // console.log(config,config?.formItemConfig?.rules?.length>0)
        if(config?.formItemConfig?.rules?.length>0&&config.formItemConfig.rules[0].required){
            // if(!form[config.formLabel]){return false}

            requierd.push(`form.${config.formLabel}`)
        }
    }
    return `(${requierd.join('&&')})`
    // return true
}