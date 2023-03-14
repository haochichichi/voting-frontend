import style from './style/pdfReader.module.scss'
const IFRAME_PDF_PARAM="application/x-google-chrome-pdf"

export const BlobPDFReader=(props:any, context:any)=>{
    const data = props.file?.originFileObj? props.file.originFileObj:props.file
   
    let url=''
     /* 兼容ie内核，360浏览器的兼容模式 */
     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        const blob = new Blob([data], {
          type: 'application/pdf;charset=utf-8'
        });
        window.navigator.msSaveOrOpenBlob(blob, props.file?.name);
      } else {
        /* 火狐谷歌的文件下载方式 */
        const blob = new Blob([data], {
          type: 'application/pdf;charset=utf-8'
        });
        url = window.URL.createObjectURL(blob);
    }
    

    return ( 
    <>
        <iframe
            className={style.container}
	        src={url}
	        type={IFRAME_PDF_PARAM}
        />
        {props.file?.name}
    </>)
}

export const UrlPDFReader=(props:any, context:any)=>{
    return(<>
        <iframe
            className={style.container}
	        src={props.url}
	        type={IFRAME_PDF_PARAM}
        />
    </>)
}

export const PDFReader=(props:any, context:any)=>{
    const {
        file={},
        url='',
        ...otherProps
    }= props

    return(
        <>
                {url===''? <BlobPDFReader {...props} />:<UrlPDFReader {...props} />}
        </>
    )
}