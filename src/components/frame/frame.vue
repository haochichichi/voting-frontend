<script setup lang="ts">
    import style from './style/frame.module.scss'
</script>

<template>
    <a-layout :style="{
        height:'100vh',
        width:'100vw',
        minHeight:'1080px',
        minWidth:'1920px',
    }">
        <a-layout-header :style="{backgroundColor: '#206CCF',height:'72px'}">
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
        <a-layout-footer> <slot name="footer"></slot> </a-layout-footer>
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