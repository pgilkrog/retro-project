<template lang="pug">
.wrapper(class="w-100 overflow-hidden" ref="itemListRef" @mouseleave="handleMouseLeave")
  .test-horizontal(class="w-100 bg-red-200 inline-flex space-x-6 overflow-x-hidden px-4" )
    .item(
      v-for="item in listOfItems" 
      class="h-[300px] min-w-72 bg-blue-200 p-4 my-4 cursor-pointer select-none"
      @click.prevent="handleItemClick(item)"
      @mousedown.prevent="startDragging"
      @mouseup.prevent="stopDragging"
      @mousemove.prevent="handleDrag"
    )
      p(class="px-8") {{ item.name }}
  .buttons(class="absolute w-full flex justify-between -mt-52 pointer-events-none")
    ButtonComponent(text="<" class="!pointer-events-auto" @click="scrollByClick(-300)")
    ButtonComponent(text=">" class="!pointer-events-auto" @click="scrollByClick(300)")
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
</template>
<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const listOfItems = [
  { name: 'hej', url: 'https://google.dk' },
  { name: 'hej2', url: 'https://google.dk' },
  { name: 'hej3', url: 'https://google.dk' },
  { name: 'hej4', url: 'https://google.dk' },
  { name: 'hej5', url: 'https://google.dk' },
  { name: 'hej6', url: 'https://google.dk' },
  { name: 'hej7', url: 'https://google.dk' },
  { name: 'hej8', url: 'https://google.dk' },
  { name: 'hej9', url: 'https://google.dk' },
  { name: 'hej10', url: 'https://google.dk' },
  { name: 'hej11', url: 'https://google.dk' },
  { name: 'hej12', url: 'https://google.dk' },
  { name: 'hej13', url: 'https://google.dk' },
  { name: 'hej14', url: 'https://google.dk' },
  { name: 'hej15', url: 'https://google.dk' },
  { name: 'hej16', url: 'https://google.dk' },
  { name: 'hej17', url: 'https://google.dk' },
]

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
  },
})

const isDragging = ref(false)
const mouseIsDown = ref(false)
let startX = 0
const itemListRef = ref<HTMLElement>()
let clickStartTime = 0

const clickCarousel = (item: object) => {
  console.log(item)
}

const scrollByClick = (value: number) => {
  // itemListRef.value!.scrollLeft += 300;
  // Use scrollBy with animation options for smooth scrolling
  itemListRef.value?.scrollBy({
    left: value, // adjust scroll distance as needed
    behavior: 'smooth',
  })
}

const handleItemClick = (item: { name: string; url: string }) => {
  // Check if click was not within a short timeframe after starting drag
  if (Date.now() - clickStartTime < 150) {
    // Adjust debounce threshold as needed
    // Handle item click logic, e.g., navigate to detail page
    console.log(`Item clicked: ${item.name}`)
    // You can replace this with navigation logic using `router-link` or similar
    window.location.href = item.url
  }
}

const handleMouseLeave = () => {
  isDragging.value = false
}

const startDragging = (event: MouseEvent) => {
  console.log('started dragging')
  clickStartTime = Date.now() // Capture click start time
  isDragging.value = true
  startX = event.clientX
}

const stopDragging = () => {
  console.log('stopDragging')
  isDragging.value = false
}

const handleDrag = (event: MouseEvent) => {
  console.log('handle dis')
  if (isDragging.value === false || !itemListRef.value) return

  const deltaX = event.clientX - startX
  itemListRef.value.scrollLeft -= deltaX
  startX = event.clientX
}
</script>
