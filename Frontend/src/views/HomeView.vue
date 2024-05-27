<template lang="pug">
.home-wrapper(
  class="flex h-full flex-col w-full absolute" 
  v-if="userData != undefined"
  :style="[userData.settings.useBackground === true ? {'background-image': 'url('+ getImageUrl(userData.settings?.backgroundImage) + ')'} : {'background-color': userData.settings?.backgroundColour}]"
)
  .desktop-container(class="flex flex-col justify-start py-4")
    .grid.grid-cols-2.gap-y-8(v-if="allPrograms")
      DesktopItem(
        v-for="program in allPrograms"
        v-on:generateComponent="generateComponent(program)"
        :key="program._id"
        :program
        :itemColor="program.color"
      )
  .test-horizontal(class="w-100 bg-red-200 flex space-x-6 flex-row overflow-x-scroll px-4"  ref="itemListRef")
    .item(
      v-for="item in listOfItems" 
      class="h-64 !w-[200px] bg-blue-200 p-4 my-4 cursor-pointer select-none"
      @click.prevent="handleItemClick(item)"
      @mousedown.prevent="startDragging"
      @mouseup.prevent="stopDragging"
      @mousemove.prevent="handleDrag"
    )
      p(class="px-8") {{ item.name }}
  .test-dis 
    Carousel( v-bind="settings" :breakpoints="breakpoints")
      Slide(v-for="(item, index) in listOfItems" :key="index"
          @click="clickCarousel(item)")
        .item(
          class="h-64 !w-[200px] bg-blue-200 p-4 my-4 cursor-pointer select-none"
        )
          p(class="px-8") {{ item.name }}
      template(#addons)
        Navigation
  ComponentMachine
  Menu(v-if="showMenu")
  Taskbar(v-on:changeShowMenu="changeShowMenu" :showMenu="showMenu")
//- Salvatore
//- TestStuff
//- LaCosaNostra
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { programsStore } from '@/stores/programsStore'
import { useAuthStore } from '@/stores/authStore'
// import Salvatore from '@/phaser/salvatore/SalvatoreGame.vue'
//import TestStuff from '@/phaser/test-stuff/TestStuff.vue'
// import LaCosaNostra from '@/phaser/la-cosa-nostra/LaCosaNostraGame.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const authstore = useAuthStore()
const programsstore = programsStore()
const userstore = userStore()

const userData = storeToRefs(userstore).userData
const showMenu = ref<boolean>(false)
const allPrograms = computed<IProgram[]>(() => programsstore.installedPrograms)

const settings = ref({
      itemsToShow: 1,
      snapAlign: 'center',
    })
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    const breakpoints = ref({
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      }
    })

const listOfItems = [
  {name: 'hej', url: 'https://google.dk'},
  {name: 'hej2', url: 'https://google.dk'},
  {name: 'hej3', url: 'https://google.dk'},
  {name: 'hej4', url: 'https://google.dk'},
  {name: 'hej5', url: 'https://google.dk'},
  {name: 'hej6', url: 'https://google.dk'},
  {name: 'hej7', url: 'https://google.dk'},
  {name: 'hej8', url: 'https://google.dk'},
  {name: 'hej9', url: 'https://google.dk'},
  {name: 'hej10', url: 'https://google.dk'},
  {name: 'hej11', url: 'https://google.dk'},
  {name: 'hej12', url: 'https://google.dk'},
  {name: 'hej13', url: 'https://google.dk'},
  {name: 'hej14', url: 'https://google.dk'},
  {name: 'hej15', url: 'https://google.dk'},
  {name: 'hej16', url: 'https://google.dk'},
  {name: 'hej17', url: 'https://google.dk'}
]

onMounted(async () => {
  if (authstore.isLoggedIn === true) {
    await programsstore.init()
    await userstore.getUserById()
  }
})

const generateComponent = (program: IProgram): void => {
  programsstore.addProgramToActive({...program})
}

const getImageUrl = (filename: string): string => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}

const changeShowMenu = (): void => {
  showMenu.value = !showMenu.value
}

const isDragging = ref(false);
const mouseIsDown = ref(false)
let startX = 0;
const itemListRef = ref<HTMLElement>();
  let clickStartTime = 0;

  const clickCarousel = (item: any) => {
    console.log(`Item clicked: ${item.name}`);
  }

const handleItemClick = (item: any) => {
  // Check if click was not within a short timeframe after starting drag
  if (Date.now() - clickStartTime < 150) { // Adjust debounce threshold as needed
    // Handle item click logic, e.g., navigate to detail page
    console.log(`Item clicked: ${item.name}`);
    // You can replace this with navigation logic using `router-link` or similar
  }
};

const startDragging = (event: MouseEvent) => {
  console.log('started dragging')
  clickStartTime = Date.now(); // Capture click start time
  isDragging.value = true;
  startX = event.clientX;
};

const stopDragging = () => {
  isDragging.value = false;
};

const handleDrag = (event: MouseEvent) => {
  console.log('handle dis')
  if (isDragging.value === false || !itemListRef.value) return;

  const deltaX = event.clientX - startX;
  itemListRef.value.scrollLeft -= deltaX;
  startX = event.clientX;
};
</script>

<style lang="sass">
.home-wrapper
  background-position: center
  background-repeat: no-repeat
  background-size: cover
  image-rendering: pixelated
// canvas
//   z-index: 9999
//   position: absolute
</style>