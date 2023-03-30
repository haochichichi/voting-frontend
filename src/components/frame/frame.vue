<!-- 页面框架 -->
<script setup lang="ts">
    import style from './style/frame.module.scss'
    const props =defineProps(['disableHeadBar'])
</script>
<template>
    <a-layout :style="{
        minHeight:'max(1080px,100vh)',
        minWidth:'max(1920px,100vw)',
    }">
      
        <a-layout-header 
            v-if="!props.disableHeadBar"
        >
            <div v-bind="{className:style.header}">
                <div v-bind="{className:style.menus}">
                    <div>logo 图标</div>
                    <slot name="headerContent"></slot>
                    <!-- <div>
                        <a-menu>
                            <a-menu-item >nav 1</a-menu-item>
                        </a-menu>
                    </div> -->
                </div>
                <slot name="headerRight"></slot>
            </div>
        </a-layout-header>
        <a-layout-content>
            <div v-bind="{className:style.content}">
                <slot name="content"></slot>
            </div>           
        </a-layout-content>
        <slot name="footer"></slot>
      
    </a-layout>
    
    <!-- <div v-bind="{
        className:style.container,
    }">
        <div v-bind="{
            className:style.header,
        }">
            <div>logo</div>
            <div>内容</div>
            <div>222</div>
            <slot></slot>
        </div>
        <div v-bind="{
            className:style.content,
        }">
            333
            <slot></slot>
        </div>
    </div> -->
</template>