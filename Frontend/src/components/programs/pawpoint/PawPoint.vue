<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true"
  :variant="program.color"
  :isNotProgram="false"
  :showMenu="true"
)
  .pawpoint.d-flex.flex-column.justify-content-between
    .active-slide.h-100.d-flex.bg-primary.m-4.flex-column.justify-content-center.text-white.pointer
      Component(
        v-if="loadingSlide === false && activeSlide.type !== undefined"
        :is="defineAsyncComponent(() => import(`@/components/programs/pawpoint/slides/${activeSlide.type}.vue`))"
        :slide="activeSlide"
      )
      span(v-else) 
        .title.d-flex.justify-content-center.align-items-center.my-4
          .spinner-border
      
    .group-slides.d-flex
      .group-slides-item.m-4.d-flex.pointer(
        v-for="slide in slides"
        @click="setActiveSlide(slide)"
        :key="slide.id"
      )
        .d-flex.bg-primary.text-white.w-100.d-flex.justify-content-center.align-items-center(:class="activeSlide.title === slide.title ? 'border border-danger' : ''")
          h1 {{ slide.id }}
      .group-slides-item.m-4.d-flex.pointer  
        .d-flex.bg-success.text-white.w-100.d-flex.justify-content-center.align-items-center
          IconComponent(name="fa-plus" variant="light")
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import type { PropType } from 'vue'
import type { IProgram } from '@/models/index'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const loadingSlide = ref(false)
const activeSlide = ref(Object as any)
const slides = ref([
  {
    id: 1,
    title: "Paws Projekt", 
    text: '<ul><li>Vue 3</li><li>Pinia</li><li>Phaser 3</li></ul>',
    type: 'SlideTitleText'
  },
  {
    id: 2,
    title: "Paws billede", 
    image: 'https://umbrellacreative.com.au/wp-content/uploads/2020/01/hide-the-pain-harold-why-you-should-not-use-stock-photos-1024x683.jpg',
    type: 'SlideTitleImage'
  },
  {
    id: 3,
    title: "Vue 3",
    text: '<ul>'+
      '<li>Forbedret og hurtigere performance</li>' +
      '<li>Composition API</li>' +
      '<li>Fuld typescript support</li>' +
      '<li>Teleport/Portal</li>' +
      '<li>Fragments: flere root nodes</li>' +
      '<li>Suspense</li>' +
      '<li>Multiple v-models</li>' +
      '</ul>',
    type: 'SlideTitleText'
  },
  {
    id: 4,
    title: "Pinia",
    text: '',
    type: 'SlideTitleText'
  },
  {
    id: 5,
    title: "Phaser 3",
    text: '<ul>' +
    '<li>PingPong</li>' +
    '<li>Flappy Bird copi</li>' +
    '<li>Simple platformer</li>' +
    '</ul>',
    type: undefined
  },
])

const setActiveSlide = (slide: any) => {
  loadingSlide.value = true
  activeSlide.value = slide
  loadingSlide.value = false
}

onMounted (() => {
  activeSlide.value = slides.value[0]
})
</script>

<style lang="sass" scoped>
.pawpoint
  width: 90vw !important
  height: 80vh !important
  max-width: 1500px
  .active-slide
    width: -webkit-fill-available
    height: -webkit-fill-available
  .group-slides
    height: fit-content
    .group-slides-item
      height: 100px
      width: 100px
</style>