import {DETAIL_CARD_TAG_GROUP_DIC} from './constant'

// 根据关键词对level4内容进行分组 
export const getDetailCardGroupList=(tagList)=>{
    const tagListContent=[]
    if(!tagList||tagList.length===0){
        return tagListContent
    }
    const tagListSet=new Set(tagList)
    const sortGroup=DETAIL_CARD_TAG_GROUP_DIC.sort((a,b)=>a.sort-b.sort)
    sortGroup.forEach((eachKey)=>{
        const eachList=[...tagListSet].filter((eachTag)=>{
            if(eachTag.label.includes(eachKey.key)){
                tagListSet.delete(eachTag)
                return true
            }
            return false
        })
        tagListContent.push(eachList)
    })
    const others=[...tagListSet]
    if(others.length>0){
        tagListContent.push(others)
    }
    return tagListContent
}

// 根据点击拼接所选menu数组
export const getSelectedMenuList=(menuArray,childNode)=>{
    return [...menuArray,childNode]
}