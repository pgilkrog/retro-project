<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true"
  :variant="program.color"
  :isNotProgram="false"
  :showMenu="true"
)
  .pawpoint.d-flex.flex-column.justify-content-between
    SlideTitleText(:title="activeSlide.title" :text="activeSlide.text" v-if="activeSlide.type === 'titletext'")
    SlideTitleImage(:title="activeSlide.title" :image="activeSlide.image" v-else)
    .group-slides.d-flex
      .group-slides-item.m-4.d-flex.pointer(
        v-for="(slide, index) in slides"
        @click="setActiveSlide(slide)"
      )
        .d-flex.bg-primary.text-white.w-100.d-flex.justify-content-center.align-items-center(:class="activeSlide.title === slide.title ? 'border border-danger' : ''")
          h1 {{ index }}
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SlideTitleText from './slides/SlideTitleText.vue'
import SlideTitleImage from './slides/SlideTitleImage.vue'

const props = defineProps({
  program: Object
})

const activeSlide = ref(Object as any)
const slides = ref([
  {
    title: "Paws Projekt", 
    text: '<ul><li>Vue 3</li><li>Pinia</li><li>Phaser 3</li></ul>',
    type: 'titletext'
  },
  {
    title: "Paws billede", 
    image: 'https://umbrellacreative.com.au/wp-content/uploads/2020/01/hide-the-pain-harold-why-you-should-not-use-stock-photos-1024x683.jpg',
    type: 'titleimage'
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
      '</ul>',
    type: 'titletext'
  },
  {
    title: "Pinia",
    text: '',
    type: 'titletext'
  },
  {
    title: "Phaser 3",
    text: '<ul>' +
    '<li>PingPong</li>' +
    '<li>Flappy Bird copi</li>' +
    '<li>Simple platformer</li>' +
    '</ul>',
    type: 'titletext'
  },
])

const setActiveSlide = (slide: any) => {
  activeSlide.value = slide
}

onMounted (() => {
  activeSlide.value = slides.value[0]
})
</script>

<style lang="sass" scoped>
.pawpoint
  width: 90vw !important
  height: 80vh !important
  .active-slide
    width: -webkit-fill-available
    height: -webkit-fill-available
  .group-slides
    height: fit-content
    .group-slides-item
      height: 100px
      width: 100px
</style>