import jszip from 'jszip'


/**
 * @description 获取文件前缀名称
 * @param {string} fileFullName 文件全称
 */
export function getFileContentName(fileFullName:string):string{
    return fileFullName.substring(0,fileFullName.lastIndexOf('.')>0?fileFullName.lastIndexOf('.'):fileFullName.length)
}

export const getFile=(file)=>{
    return file?.originFileObj? file.originFileObj:file
}

export const FileToArrayBuffer=(fileContent)=>{
    const file=getFile(fileContent)
    return new Promise((resolve,reject)=>{
        file.arrayBuffer().then(data=>resolve(data))
    })
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
export const zipToFileList =(zipContent,fileFormate)=>{
    const defaultFileFormate=fileFormate?fileFormate:'arrayBuffer'
    return new Promise((resolve,reject)=>{
        const zipFile=getFile(zipContent)
        const JSZip =new jszip()
        

        JSZip.loadAsync(zipFile).then(async(result)=>{
            const fileList=[]
            const fileKeys= Object.keys(result.files)
            for (let i=0;i<fileKeys.length;i++){
                const response=await result.files[fileKeys[i]].async(defaultFileFormate)
                const fileObj={
                    raw:result.files[fileKeys[i]]
                }
                fileObj[defaultFileFormate]=response
                fileList.push(fileObj)
            }
            resolve(fileList)
        }).finally(()=>{
            resolve([])
        })


        // zip.loadAsync(zipFile).then( async(result)=>{
        //     const newFileList=await new Promise((resolve,reject)=>{
        //         const fileList=[]
        //         Object.keys(result.files).forEach( async (key)=>{
        //             const response=await result.files[key].async(defaultFileFormate)
        //             fileList.push(response)
        //         })
        //         resolve(fileList)
        //     })
        //         // fileList.push(new Blob([result.files[key]],{}))
            
        //     resolve(newFileList)
        // }).finally(()=>{
        //     resolve(fileList)
        // })
    })
    
}


export const fileToBlob = (file)=>{
    
}


//大类
const formatMap = {
    'pdf': ['25', '50', '44', '46'],
    'file2003': ['d0', 'cf', '11', 'e0'],
    'file2007': ['50', '4b', '03', '04', '14', '00', '06', '00'],
}
//区分xlsx,pptx,docx三种格式的特征数。通过每个文件末尾的关键词检索判断
const format2007Map = {
    xlsx: ['77', '6f', '72', '6b', '73', '68', '65', '65', '74', '73', '2f'],// 转换成ascii码的含义是 worksheets/
    docx: ['77', '6f', '72', '64', '2f'],// 转换成ascii码的含义是 word/
    pptx: ['70', '70', '74', '2f'],// 转换成ascii码的含义是 ppt/
}
//区分xls,ppt,doc三种格式的特征数，关键词同样出现在文件末尾
const pptFormatList = ['50', '6f', '77', '65', '72', '50', '6f', '69', '6e', '74', '20', '44', '6f', '63', '75', '6d', '65', '6e', '74'];// 转换成ascii码的含义是 PowerPoint Document
const format2003Map = {
    xls: ['4d', '69', '63', '72', '6f', '73', '6f', '66', '74', '20', '45', '78', '63', '65', '6c'],// 转换成ascii码的含义是 Microsoft Excel
    doc: ['4d', '69', '63', '72', '6f', '73', '6f', '66', '74', '20', '57', '6f', '72', '64'],// 转换成ascii码的含义是 Microsoft Word
    ppt: pptFormatList.join(',00,').split(',')
}
//xls格式的文件还有一种例外情况，就是保存为.html格式的文件。特征码是office:excel
let xlsHtmlTarget = ['6f', '66', '66', '69', '63', '65', '3a', '65', '78', '63', '65', '6c']; 

 //截取部分数组，并转化成16进制
 function getSliceArrTo16(arr, start, end) {
    let newArr = arr.slice(start, end);
    return Array.prototype.map
        .call(newArr, (x) => ('00' + x.toString(16)).slice(-2));
}
//判断arr数组是否包含target数组，且不能乱序。如果数组比较小，直接将两个数组转换成字符串比较。
//在数组长度大于500的情况下，写了如下方法来提高检索的效率:
function isListContainsTarget(target, arr) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] == target[0]) {
            let temp = arr.slice(i, i + target.length);
            if (temp.join() === target.join()) {
                return true
            }
        }
        i++;
    }
}

// 判断文件格式
export const getFileTypeFromArrayBuffer=(arrayBuffer)=> {
	try {
        if (Object.prototype.toString.call(arrayBuffer) !== '[object ArrayBuffer]') {
            throw new TypeError("The provided value is not a valid ArrayBuffer type.")
        }
        let arr = new Uint8Array(arrayBuffer);
		let str_8 = getSliceArrTo16(arr, 0, 8).join('');  //只截取了前8位
		//为了简便，匹配的位置索引我选择在代码里直接固定写出，你也可以把相应的索引配置在json数据里。
		//第一次匹配，只匹配数组前八位，得到大范围的模糊类型
		let result = '';
		for (let type in formatMap) {
		    let target = formatMap[type].join('');
		    if (~str_8.indexOf(target)) { //相当于(str_8.indexOf(target) !== '-1')
		        result = type;
		        break;
		    }
		}
		
		if (!result) {
			//第一次匹配失败，不属于file2003,file2007,pdf。有可能是html格式的xls文件
			//通过前50-150位置判断是否是xls
		    let arr_start_16 = getSliceArrTo16(arr, 50, 150);
		    if (~(arr_start_16.join('').indexOf(xlsHtmlTarget.join('')))) {
		        return 'xls';
		    }
		    return 'other';
		}
		if (result == 'pdf') {
		     return result;
		 }
		 if (result == 'file2007') {
		     //默认是xlsx,pptx,docx三种格式中的一种，进行第二次匹配.如果未匹配到，结果仍然是file2007
		     let arr_500_16 = getSliceArrTo16(arr, -500,arr.length);
		     for (let type in format2007Map) {
		         let target = format2007Map[type];
		         if (isListContainsTarget(target, arr_500_16)) {
		             result = type;
		             break;
		         }
		     }
		     return result;
		 }
		 if (result == 'file2003') {
		     let arr_end_16 = getSliceArrTo16(arr, -550, -440);
		     for (let type in format2003Map) {
		         let target = format2003Map[type];
		         //通过倒数440-550位置判断是否是doc/ppt/xls
		         if (~(arr_end_16.join('').indexOf(target.join('')))) {
		             result = type;
		             break
		         }
		     }
		     return result;
		 }
		//未匹配成功
		return 'other';

    }catch(e){
        console.log(e)
    }
        
}