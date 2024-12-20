<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    :variant="program.color"
    :is-not-program="false"
    :show-menu="true"
  >
    <div class="pawpoint flex flex-col justify-between">
      <div
        class="active-slide h-full flex bg-blue-500 flex-col m-4 justify-center items-center cursor-pointer text-white"
      >
        <Component
          v-if="
            loadingSlide === false && activeSlide !== undefined && activeSlide.type !== undefined
          "
          :is="
            defineAsyncComponent(
              () => import(`@/components/programs/pawpoint/slides/${activeSlide.type}.vue`)
            )
          "
          :slide="activeSlide"
        ></Component>
        <span v-else>
          <div class="title flex justify-center items-center my-4">
            <div class="spinner-border"></div>
          </div>
        </span>
      </div>
      <div class="group-slides flex">
        <div
          class="group-slides-item m-4 flex cursor-pointer"
          v-for="slide in slides"
          @click="setActiveSlide(slide)"
          :key="slide.id"
        >
          <div
            class="flex bg-blue-500 text-white w-full justify-center items-center"
            :class="activeSlide.title === slide.title ? 'border border-danger' : ''"
          >
            <h1>{{ slide.id }}</h1>
          </div>
        </div>
        <div class="group-slides-item m-4 flex cursor-pointer">
          <div class="flex bg-green-500 text-white w-full justify-center items-center">
            <IconComponent
              name="fa-plus"
              color="light"
            ></IconComponent>
          </div>
        </div>
      </div>
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import { type IProgram, type ISlide, SlideTypes } from '@/models/index'
import { defineAsyncComponent } from 'vue'

const { program } = defineProps<{
  program: IProgram
}>()

const loadingSlide = ref(false)
const slides = ref<ISlide[]>([
  {
    id: 1,
    title: 'Paws Projekt',
    text: '<ul><li>Vue 3</li><li>Pinia</li><li>Phaser 3</li></ul>',
    type: SlideTypes.SlideTitleText,
  },
  {
    id: 2,
    title: 'Paws billede',
    image:
      'https://umbrellacreative.com.au/wp-content/uploads/2020/01/hide-the-pain-harold-why-you-should-not-use-stock-photos-1024x683.jpg',
    type: SlideTypes.SlideTitleImage,
  },
  {
    id: 3,
    title: 'Vue 3',
    text:
      '<ul>' +
      '<li>Forbedret og hurtigere performance</li>' +
      '<li>Composition API</li>' +
      '<li>Fuld typescript support</li>' +
      '<li>Teleport/Portal</li>' +
      '<li>Fragments: flere root nodes</li>' +
      '<li>Suspense</li>' +
      '<li>Multiple v-models</li>' +
      '</ul>',
    type: SlideTypes.SlideTitleText,
  },
  {
    id: 4,
    title: 'Pinia',
    text: 'ting',
    type: SlideTypes.SlideTitleText,
  },
  {
    id: 5,
    title: 'Phaser 3',
    text:
      '<ul>' +
      '<li>PingPong</li>' +
      '<li>Flappy Bird copi</li>' +
      '<li>Simple platformer</li>' +
      '</ul>',
    type: SlideTypes.SlideTitleText,
  },
])
const activeSlide = ref<ISlide | undefined>(slides.value[0])

const setActiveSlide = (slide: ISlide) => {
  loadingSlide.value = true
  activeSlide.value = slide
  loadingSlide.value = false
}
</script>

<style scoped lang="sass">
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
