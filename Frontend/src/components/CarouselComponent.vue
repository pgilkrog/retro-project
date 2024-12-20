<template>
  <div
    class="wrapper w-100 overflow-hidden"
    ref="itemListRef"
    @mouseleave="handleMouseLeave"
  >
    <div class="test-horizontal w-100 bg-red-200 inline-flex space-x-6 overflow-x-hidden px-4">
      <div
        v-for="(item, key) in listOfItems"
        :key
        class="item h-[300px] min-w-72 bg-blue-200 p-4 my-4 cursor-pointer select-none"
        @click.prevent="handleItemClick(item)"
        @mousedown.prevent="startDragging"
        @mouseup.prevent="stopDragging"
        @mousemove.prevent="handleDrag"
      >
        <p class="px-8">{{ item.name }}</p>
      </div>
    </div>
    <div class="buttons absolute w-full flex justify-between -mt-52 pointer-events-none">
      <ButtonComponent
        text="<"
        class="!pointer-events-auto"
        @click="scrollByClick(-300)"
      />
      <ButtonComponent
        text=">"
        class="!pointer-events-auto"
        @click="scrollByClick(300)"
      />
    </div>
  </div>
  <div class="test-dis" />
</template>
<script setup lang="ts">
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

const isDragging = ref(false)
let startX = 0
const itemListRef = ref<HTMLElement>()
let clickStartTime = 0

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
