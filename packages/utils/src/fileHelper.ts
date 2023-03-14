import jszip from 'jszip'

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
export const fileListToZip=async (zipName,fileList)=>{
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
 * @param {string} zipFile 被解压的zip file
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