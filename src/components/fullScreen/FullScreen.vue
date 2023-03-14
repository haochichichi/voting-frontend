<template>
    <div ref="button" @click="toggleFullscreen">
        <button>111 </button>
    </div>
    <div ref="page">
        <button>222 </button>
    </div>
    <PDFReader v-bind="{
        url:'https://d1wqtxts1xzle7.cloudfront.net/56843679/%E6%95%99%E8%82%B2%E7%A0%94%E7%A9%B6%E6%96%B9%E6%B3%95_%E8%A2%81%E6%8C%AF%E5%9B%BD.pdf?1529634345=&response-content-disposition=inline%3B+filename%3D56843679.pdf&Expires=1678762182&Signature=LbieD~feOt4HGZfyRhH8PCbz7QvPaUEKKqIIWDpuMP50YI3JbgDyQvMNsIiwXdYYiwc3repJ23HOHLrF61EcZagpjnvzY59L1nfwWNNQdtJ7qK0z5d5JRoJYLmKL6Q7PlQlslsG7vUn41N-rcMDmUqw6tVh8s7CMKyk1cha5Nf-P02J0woy-jP0lTqqBRehRyjc9o-xId~0IIak6qa2ohYAaihmUpjb~plrHy-cMnbiEXdYBKPtY7WSzRug0NaOfjEoBXCwB7c-08iouU5fpnHx8VfFtm0jHm4pNQTiJ5RfAxhLd9Y0hlcCvwoIf9mpbP8Ad8-si91dEsQ3UgPma4w__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA',
    }"/>
    <!-- <DefaultModal v-bind="{config:modalConfig}"/>第一个
    <DefaultModal v-bind="{config:modalConfig}"/>第二个 -->

    <AButton @click="buttonClick">弹窗</AButton>
    <a-button type="default">看看</a-button>
    <Modal ref="modalRef" v-bind="{config:modalConfig}">
    <PDFReader v-bind="{
            url:'https://d1wqtxts1xzle7.cloudfront.net/56843679/%E6%95%99%E8%82%B2%E7%A0%94%E7%A9%B6%E6%96%B9%E6%B3%95_%E8%A2%81%E6%8C%AF%E5%9B%BD.pdf?1529634345=&response-content-disposition=inline%3B+filename%3D56843679.pdf&Expires=1678786590&Signature=Q1BFtUEx1e~Ww734NPa89CxGXSv0cbvmnhcUyw4OqhiNNwcV~gB8XK7B69LkKQLQDXk7FPXXon6jX9HiCLmozJu2As5yYLvcYrG4vpmneST5-Hn-wS19oZuF4A9PrwO1SgnYVHqr-AMZwNLbxSj7aswx9AfSwF4n14qG7etaqEHZaHu2N8GO72Ijl-FEsZ0SRp1lV4T-Qoi53Lp~RtrlDrCAJ5-Mf-HMCyuASLJs8nXZrH3cs7efSOe0Fv4go2b306rtOxCACb6BlmqvLVWprfbfvUmzhgAevHv8udaXJU1iZZaZUXC9guOf3tA3clj439tJV0OydLonozYT6ehayA__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA',
            }"/>
    </Modal>
    <AButton @click="buttonClick2">弹窗2</AButton>
    <Modal ref="modalRef2" v-bind="{}">
        
    </Modal>

    </template>


<script setup lang="ts">
    import{ref} from 'vue'
    import {useFullscreen} from '@vue3-common-packages/headless'
    import {PDFReader,DefaultModal} from '@vue3-common-packages/components'
    import Modal from '/@/components/modal/defaultModal.vue'
    import {Button as AButton} from "ant-design-vue"

    const button = ref(null)
    const page = ref(null)
    const modalRef= ref(null)
    const modalRef2= ref(null)
    const modalConfig=ref({
        // footer:undefined,
        title:'111',
    })

    const buttonClick = (event)=>{
        modalRef.value.showDefaultModal.call(this,modalRef.value.visible)
    }

    const buttonClick2 = (event)=>{
        modalRef2.value.showDefaultModal.call(this,modalRef2.value.visible)
    }


    const { isTargetFullscreen, toggleFullscreen } = useFullscreen({
            getElement: ()=>page.value,
            onFullscreenChange: (value) => {
                console.log('!!!',value)
            },
        })
    console.log(useFullscreen)
</script>