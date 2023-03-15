import jszip from 'jszip'
import ExportJsonExcel from 'js-export-excel'

/**
 * @description 获取文件前缀名称
 * @param {string} fileFullName 文件全称
 */
export function getFileContentName(fileFullName:string):string{
    return fileFullName.substring(0,fileFullName.lastIndexOf('.')>0?fileFullName.lastIndexOf('.'):fileFullName.length)
}

/**
 * @description 文件压缩为zip格式
 * @param {string} zipName 文件全称
 */
export const fileListToZip=async (zipName:string,fileList):Promise<Blob>=>{
    const zip =new jszip()
    zip.file(zipName,fileList)
    const zipFile = await zip.generateAsync({
        type:"blob",
        compression:"DEFLATE",
        compressionOptions:{
            level:5
        }
    })
    return zipFile
}

/**
 * @description 解压zip格式文件
 * @param {any} zipFile 被解压的zip file
 */
export const zipToFileList =(zipFile)=>{
    const zip =new jszip()
    const fileList=[]
    zip.loadAsync(zipFile).then((result)=>{
        Object.keys(result.files).forEach((key)=>{
            fileList.append(result.files[key])
        })
    })
    return fileList
}


export const ArrayToExcelObj = (fileName:string,datas)=>{
    const excelResult={}
    excelResult.fileName=fileName
    excelResult.datas=datas
    // option.datas=[
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
    return new ExportJsonExcel(excelResult);
    // ArrayToExcel(fileName,datas).saveExcel();
}

export const excelToObject = ()=>{

}

export const excelToArray = ()=>{

}