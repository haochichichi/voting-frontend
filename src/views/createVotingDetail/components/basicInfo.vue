<script setup lang="ts">
    import style from '../styles/votingInfo.module.scss'
    import {Card} from '@vue3-common-packages/components'
    import {reactive} from 'vue'
    import {Button,Form,Input} from 'ant-design-vue'


    const formState: UnwrapRef<FormState> = reactive({
      layout: 'vertical',
      fieldA: '',
      fieldB: '',
    });

    const onSubmit =()=>{}
</script>
<template>
    <Card :className="style.container">
        <template v-slot:headerLeft>评审投票详细信息编辑</template>
        <div   :className="style.content">
            <a-form layout="vertical" >
                <div :className="style.eachRow">
                    <a-form-item label="选择年度" :className="style.defaultInput">
                        <a-input 
                            v-model:value="formState.fieldA" 
                            placeholder="input placeholder" 
                        />
                    </a-form-item>
                    <a-form-item label="评审投票名称" :className="style.titleInput">
                        <a-input 
                            v-model:value="formState.fieldA" 
                            placeholder="input placeholder" 
                        />
                    </a-form-item>
                </div>
                <div :className="style.eachRow" >
                    <a-form-item label="指标数" :className="style.defaultInput">
                        <a-input 
                            v-model:value="formState.fieldA" 
                            placeholder="input placeholder" 
                        />
                    </a-form-item>
                    <a-form-item label="评审专家数"  :className="style.defaultInput">
                        <a-input 
                            v-model:value="formState.fieldA" 
                            placeholder="input placeholder" 
                        />
                    </a-form-item>
                    <a-form-item label="选择会议室"  :className="style.defaultInput">
                        <a-input 
                            v-model:value="formState.fieldA" 
                            placeholder="input placeholder" 
                        />
                    </a-form-item>
                </div>
                <div :className="style.eachRow" >
                    参评人员导入
                </div>
                <div :className="style.eachRow" >
                    申报材料导入
                </div>
                <a-form-item :className="style.eachRow">
                    <a-button type="primary" @click="onSubmit">Create</a-button>
                    <a-button style="margin-left: 10px">Cancel</a-button>
                </a-form-item>
            </a-form>
        </div>
    </Card>
</template>
