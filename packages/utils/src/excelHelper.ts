
import ExportJsonExcel from 'js-export-excel'
import { read, utils } from 'xlsx'

export const EXCEL_FILE_TYPE='application/vnd.ms-excel'

export const excelFileToBlob=(file)=>{
    const data=file?.originFileObj? file.originFileObj:file
    return new Blob([data], {
        type: `${EXCEL_FILE_TYPE};charset=utf-8`
    });
}

/**
 * @description array转为excel, returnResult.saveExcel() 保存文件
 * @param fileName 文件名
 * @param datas excel数据内容
 */
export const arrayToWorkbookObj = (fileName:string,datas)=>{
    const excelResult={}
    excelResult.fileName=fileName
    excelResult.datas=datas
    // excelResult.datas=[
    //     {
    //         sheetData:[//后端返回的数据表格json数据
    //             {name:'lili',age:'18'},
    //             {name:'mary',age:'20'}
    //         ],
    //         sheetHeader:['姓名','年龄'],//前端指定的表头
    //         sheetName: 'sheet',
    //         sheetFilter: ['name', 'age']
    //     },
    //     {
    //         sheetData:[//表格2的内容
    //             {grade:'90',name:'lili',},
    //             {name:'mary',grade:'99'}
    //         ],
    //         sheetHeader:['姓名','成绩']
    //     }
    // ];
    // const excel=new ExportJsonExcel(excelResult)
    // excel.saveExcel();
    
    return new ExportJsonExcel(excelResult);
    // arrayToWorkbookObj(fileName,datas).saveExcel();
}

export const excelToObject = ()=>{

}

export const workbookObjToArray=(workbook)=>{
    const result={
        rawWorkbook:workbook,
    }
    const workbookArray=[]
    workbook.SheetNames.map((sheetName)=>{
        const ws = utils.sheet_to_json(workbook.Sheets[sheetName])
        const sheetHeaderDic={}
        const sheetData=ws
        //  TODO:解决部分合并表格乱序问题
        ws.map((row)=>{
            Object.keys(row).forEach(key=>{
                sheetHeaderDic[key]=true
            })
        })
        const arrayObj={
            sheetName,
            sheetHeader:Object.keys(sheetHeaderDic),
            sheetData,
        }
        workbookArray.push(arrayObj)
    })
    // const wsname = workbook.SheetNames[0];
    result.workbookArray=workbookArray
    return result
}


// 使用xlsx解析包,读取本地excel文件
export const readWorkbookFromLocalFile=(file, callback)=> {
    if (!file||file.type!='application/vnd.ms-excel;charset=utf-8'){
        console.log('[readWorkbookFromLocalFile][非excel文件!]',file)
        return 
    }
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        try {
            const data = e.target.result;
            // 切换为新的调用方式
            const workbook = read(data, {
                type: 'binary'
            });
            // 取第一张表
            if(callback) callback(workbook);
        }catch(e){
            console.log('[readWorkbookFromLocalFile][解析excel报错!]',file,e)
            return false
        }
    };
    fileReader.readAsBinaryString(file);
}

export const excelToArray = ()=>{

}