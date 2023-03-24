<script setup lang="ts">
import PageContainer from '/@/components/frame/pageContainer.vue'
import {Card} from '@vue3-common-packages/components'
import style from './styles/currentVotingMenu.module.scss'
import {HEAD_NUM_TITLE,TAG_DIC,COLOR_DIC} from './utils/constant'

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    // slots: { title: 'customTitle', customRender: 'name' },
  },
  {
    title: '年度',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '评审投票名称',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '评审投票类型',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '评审专家数',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '本次指标数',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '评审投票阶段',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' },
  }
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['1', '2'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['1'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['3', '4'],
  },
];


</script>


<template>
    <PageContainer >
        <!-- 统计表头 -->
        <Card :className="style.titleContainer">
            <div :className="style.content">
                <div 
                    v-for="eachNumber in HEAD_NUM_TITLE"
                    :className="style.eachNumber"
                 >
                    <div :className="style.title">{{eachNumber.title}}</div>
                    <div :className="style.number">{{eachNumber.key}}</div>
                </div>
            </div>
        </Card>
        <!-- 评审投票列表 -->
        <Card :className="style.tableContainer">
            <template v-slot:headerLeft>评审投票列表</template>
            <div :className="style.content">
                <a-table 
                :columns="columns" 
                :data-source="data" 
                :className="style.table"
            >
                    <template #name="{ text }">
                    <a>{{ text }}111</a>
                    </template>
                    <template #customTitle>
                    <span>
                        <smile-outlined />
                        序号
                    </span>
                    </template>

                    <template #tags="{ text: tags }">
                    <span>
                        <a-tag
                        v-for="tag in tags"
                        v-bind="{
                            key:tag,
                            color:COLOR_DIC[TAG_DIC[tag].color]
                        }"
                        >
                        {{ tag.toUpperCase() }}
                        {{TAG_DIC[tag]}}
                        </a-tag>
                    </span>
                    </template>
                    <template #action="{ record }">
                    <span>
                        <a>Invite 一 {{ record.name }}</a>
                        <a-divider type="vertical" />
                        <a>Delete</a>
                        <a-divider type="vertical" />
                        <a class="ant-dropdown-link">
                        More actions
                        <down-outlined />
                        </a>
                    </span>
                    </template>
                </a-table>
            </div>
        </Card>
    </PageContainer>
</template>