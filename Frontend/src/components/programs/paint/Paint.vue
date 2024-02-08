<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true" 
  :showMenu="false"
  :isNotProgram="false"
  :variant="program.color"
)
  .paint-wrapper(class="flex justify-between")
    .canvas-wrapper(class="flex w-full h-full")
      canvas(
        id="canvasWrapper"
        class="bg-white h-full w-full"
        ref="canvasRef"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
      )
    .tools(class="bg-shadow flex flex-col p-4")
      .size.mb-4
        InputComponent(type="number" v-model="canvasX")
        InputComponent(type="number" v-model="canvasY")
        ButtonComponent(@clicked="setSize(canvasX, canvasY)" text="New").mt-2
      .icons(class="flex justify-center")
        ButtonComponent(icon="fa-file" size="small" @clicked="createNew()")
        ButtonComponent(icon="fa-floppy-disk" size="small" data-bs-toggle="modal" data-bs-target="#exampleModal")
        ButtonComponent(icon="fa-folder" size="small" @clicked="changeShowFiles(true)")
      .brushes(class="mt-4 flex justify-center")
        ButtonComponent(icon="fa-circle" size="small" @clicked="setBrushType('circle')")
        ButtonComponent(icon="fa-square" size="small" @clicked="setBrushType('square')")
        ButtonComponent(icon="fa-spray-can" size="small" @clicked="setBrushType('spray')")
      ColorTool(v-on:changeColor="changeColor($event)")
      div.mt-4
        input(type="color" v-model="state.color")
      div
        label Brush Size:
        input(type="range" min="1" max="50" v-model.number="state.brushSize")
  FileExplorer(
    v-if="showFiles === true"
    :isLoading="paintstore.loadingPaintings"
    :files="paintstore.usersPaintings" 
    @itemClicked="itemClicked($event)"
    @closeWindow="changeShowFiles(false)"
  )
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import type { IPainting, IProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { paintStore } from '@/stores/paintStore'
import ColorTool from './ColorTool.vue'
import FileExplorer from '@/components/FileExplorer.vue'
import type { PropType } from 'vue'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const userstore = userStore()
const paintstore = paintStore()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const state = reactive({
  color: '#000000',
  brushSize: 5,
  drawing: false,
})

const canvasX = ref<string>('0')
const canvasY = ref<string>('0')
const inputSave = ref('')
const showFiles = ref(false)
const myPaintings = ref([] as IPainting[])
const brushSizes = ref([
  1,
  3,
  5,
  7,
  9
])
const brushTypes = ref([
  'circle', 
  'square', 
  'line', 
  'spray'
])
const selectedBrush = ref(brushTypes.value[0])

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  let canvasElement = document.getElementById("canvasWrapper")

  canvas.width = canvasElement ? canvasElement.clientWidth : 500
  canvas.height = canvasElement ? canvasElement.clientHeight : 500
})

const startDrawing = (event: MouseEvent) => {
  state.drawing = true
  draw(event)
}

const stopDrawing = () => {
  state.drawing = false
}

const draw = (event: MouseEvent) => {
  if (!state.drawing) return

  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // To center the brush on the mouse, you can use the canvas's getBoundingClientRect() method to calculate the difference between the canvas's top-left corner and the viewport's top-left corner, and then subtract that difference from the clientX and clientY values
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  ctx.fillStyle = state.color

  ctx.beginPath()

  switch (selectedBrush.value) {
    case 'circle': 
      ctx.arc(x, y, state.brushSize, 0, 2 * Math.PI)
      break
    case 'square':
      ctx.fillRect(x - state.brushSize, y - state.brushSize, state.brushSize*2, state.brushSize*2)
      break
    case 'line':
      break
    case 'spray':
      const sprayRadius = state.brushSize / 1

      for (let i = 0; i < 50; i++) { // Adjust the number of dots as needed
        const offsetX = (Math.random() - 0.5) * sprayRadius * 2
        const offsetY = (Math.random() - 0.5) * sprayRadius * 2

        const sprayX = x + offsetX
        const sprayY = y + offsetY

        ctx.fillRect(sprayX, sprayY, 1, 1) // Draw small dots
      }
      break
  }
  
  ctx.fill()
}

const savePainting = (text: string) => {
  const canvas = canvasRef.value
  if(canvas === null) return

  const newPainting = {
    _id: '',
    name: text,
    canvas: canvas.toDataURL(),
    uId: userstore.userData?._id,
  }  as IPainting

    paintstore.postPainting(newPainting)
}

const loadPainting = (painting: string) => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const image = new Image()
  image.src = painting
  image.onload = () => {
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(image, 0, 0)
  }
}

const setSize = (x: number, y: number) => {
  const canvas = canvasRef.value
  if (!canvas) return

  if (x != 0)
    canvas.width = x
  if (y != 0)
    canvas.height = y

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  console.log(canvas)
}

const setBrushType = (brushType: string) => {
  selectedBrush.value = brushType
} 

const changeColor = (color: string) => {
  state.color = color
}
const changeShowFiles = (bool: boolean) => {
  showFiles.value = bool
  paintstore.getAllPaintingsByUserId(userstore.userData?._id !== undefined ? userstore.userData?._id : '')
}
const itemClicked = (painting: IPainting) => {
  loadPainting(painting.canvas)
}

</script>
<style scoped lang="sass">
.tools
  width: 200px
.paint-wrapper
  width: 1200px
  height: 800px
  .canvas-wrapper
    overflow: scroll
    scrollbar-width: thin
</style>