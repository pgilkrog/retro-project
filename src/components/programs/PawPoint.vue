<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .pawpoint.d-flex.flex-column.justify-content-between
    .active-slide.d-flex.bg-primary.m-4.flex-column.justify-content-center.text-white.pointer
      .title.d-flex.justify-content-center.align-items-center.my-4(v-if="activeSlide.title !== undefined && activeSlide.title !== ''")
        h1 {{ activeSlide.title }}
      .text.d-flex.justify-content-center.align-items-center(v-if="activeSlide.text !== undefined && activeSlide.text !== ''")
        h3(v-html="activeSlide.text")
    .group-slides.d-flex
      .group-slides-item.m-4.d-flex.pointer(
        v-for="(slide, index) in slides"
        @click="setActiveSlide(slide)"
      )
        .d-flex.bg-primary.text-white.w-100.d-flex.justify-content-center.align-items-center(        :class="activeSlide.title === slide.title ? 'border border-danger' : ''")
          h1 {{ index }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import WindowFrame from '@/components/WindowFrame.vue'

export default defineComponent({
  props: {
    program: Object
  },
  components: {
    WindowFrame
  },
  setup (props, { emit }) {
    const activeSlide = ref(Object as any)
    const slides = ref([
      {
        title: "Paws Projekt", 
        text: '<ul><li>Vue 3</li><li>Pinia</li><li>Phaser 3</li></ul>'
      },
      {
        title: "Vue 3",
        text: '<ul>'+
          '<li>Forbedret og hurtigere performance</li>' +
          '<li>Composition API</li>' +
          '<li>Fuld typescript support</li>' +
          '<li>Teleport/Portal</li>' +
          '<li>Fragments: flere root nodes</li>' +
          '<li>Suspense</li>' +
          '<li>Multiple v-models</li>' +
          '</ul>'
      },
      {
        title: "Pinia",
        text: ''
      },
      {
        title: "Phaser 3",
        text: ''
      },
    ])
    
    const setActiveSlide = (slide: any) => {
      activeSlide.value = slide
    }

    onMounted (() => {
      activeSlide.value = slides.value[0]
    })

    return {
      slides,
      activeSlide,
      setActiveSlide
    }
  }
})
</script>

<style lang="sass" scoped>
.pawpoint
  width: 90vw
  height: 80vh
  .active-slide
    width: -webkit-fill-available
    height: -webkit-fill-available
  .group-slides
    height: fit-content
    .group-slides-item
      height: 100px
      width: 100px
</style>