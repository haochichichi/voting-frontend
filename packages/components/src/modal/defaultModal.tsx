import { ref ,toRef,onMounted,defineProps, defineComponent,onUpdated} from "vue"
import {Modal as Amodal} from "ant-design-vue"

/*
    Desc:antModule封装函数式组件
    Slot:default、footer(用于默认底部)
    props:{
        config:{
            visible:ref<boolean>,
            title:string,
            footer:object,
            onOk:function,
            onCancel:function
            ……(请参考react ant design传参)
            
            // 为抽离页面关闭逻辑新增以下可配置参数:
            beforeOk:function,
            afterOk:function,
            beforeCancel:function,
            afterCancel:function,
        }, 
    }
*/

const hideModal = async (visible:any,beforeFunc:any,afterFunc:any) => {
  if(beforeFunc){
    await beforeFunc()
  }
  visible.value = false;
  if(afterFunc){
    await afterFunc()
  }
};

// 暴露点击触发方法
export const changeDefaultModal = (visible:any,value:boolean)=>{
    visible.value=value
}


// export const DefaultModal = defineComponent({
//     props:{config:{type:Object},test:{type:String}},
//     setup(props,context){
//         const defaultConfig={
//             // 默认配置函数
//             title:'',       // 默认不配置标题
//             centered:true,  // 默认居中
//             // footer:null  // 不需要底部组件
//             bodyStyle:{
//                 padding:0,
//                 minHeight:'50px',
//             }
//         }
//         let config={...defaultConfig}
       
//         console.log('更新')
//         onMounted(() => {
//             console.log('更新22',props.config.visible)
//             let {
//                 beforeOk,
//                 afterOk,
//                 beforeCancel,
//                 afterCancel,
//                 footer,
//                 ...inputConfig
//             }=props.config
//             const isInterbalVisible=beforeOk||afterOk||beforeCancel||afterCancel
//             config={
//                 ...config,
//                 ...inputConfig,
//                 footer:context.slots.footer? context.slots.footer():inputConfig.footer,
//                 onOk:isInterbalVisible? hideModal.bind(this,inputConfig.visible,beforeOk,afterOk):inputConfig.onOk,
//                 onCancel:isInterbalVisible? hideModal.bind(this,inputConfig.visible,beforeCancel,afterCancel):inputConfig.onCancel,
//                 visible:inputConfig.visible,
//             } 
//             console.log('看看',config.visible)
//         })
//         onUpdated(()=>{
//             console.log('更新4',props)
//         })
//         return ()=>{
//             <AModal {...config}>
//                 {context.slots.default?.()}
//             </AModal>
//         }
//     }
// })

export const DefaultModal = (props:any, context:any) => {
    const defaultConfig={
        // 默认配置函数
        title:'',       // 默认不配置标题
        centered:true,  // 默认居中
        // footer:null,  // 不需要底部组件
        bodyStyle:{
            padding:0,
            minHeight:'50px',
        }
    }
    let config={...defaultConfig}

        let {
            beforeOk,
            afterOk,
            beforeCancel,
            afterCancel,
            footer,
            ...inputConfig
        }=props.config
        const visible=toRef(props.config,'visible')
        const isInterbalVisible=beforeOk||afterOk||beforeCancel||afterCancel
        config={
            ...config,
            ...inputConfig,
            footer:context.slots.footer? context.slots.footer():footer===null? null:footer,
            onOk:isInterbalVisible? hideModal.bind(this,visible,beforeOk,afterOk):inputConfig.onOk,
            onCancel:isInterbalVisible? hideModal.bind(this,visible,beforeCancel,afterCancel):inputConfig.onCancel,
            visible:visible.value,
        } 

  return (
    <>
        <Amodal
            {...config}
        >
            {context.slots.default?.()}
        </Amodal>
    </>
  )
}
