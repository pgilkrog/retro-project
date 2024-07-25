<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true" 
  :showMenu="false"
  :isNotProgram="false"
  :variant="program.color"
)
  .paint-wrapper(class="flex justify-between w-[1200px] h-[800px]")
    .canvas-wrapper(v-if="canvasHeight > 0 && canvasWidth > 0" class="flex w-full h-full overflow-scroll")
      div(:width="canvasWidth" :height="canvasHeight") 
        canvas(
          id="canvasWrapper"
          :class="`bg-white w-full h-full`"
          ref="canvasRef"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
        )
    .tools(class="bg-shadow flex flex-col p-4 gap-y-4 w-[200px]")
      .size
        InputComponent(type="number" v-model="canvasWidth" label="Width")
        InputComponent(type="number" v-model="canvasHeight" label="Height")
        ButtonComponent(text="new" @clicked="newPainting()")
      .icons(class="flex justify-center")
        ButtonComponent(icon="fa-file" size="small" @clicked="setSize()")
        ButtonComponent(icon="fa-floppy-disk" size="small" data-bs-toggle="modal" data-bs-target="#exampleModal")
        ButtonComponent(icon="fa-folder" size="small" @clicked="changeShowFiles(true)")
      .brushes(class="flex justify-center")
        ButtonComponent(icon="fa-circle" size="small" @clicked="setBrushType('circle')")
        ButtonComponent(icon="fa-square" size="small" @clicked="setBrushType('square')")
        ButtonComponent(icon="fa-spray-can" size="small" @clicked="setBrushType('spray')")
      ColorTool(v-on:changeColor="changeColor($event)")
      div
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
import type { IPainting, IProgram } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { paintStore } from '@/stores/paintStore'

const { program } = defineProps<{
  program: IProgram
}>()

const userstore = userStore()
const paintstore = paintStore()

const canvasRef = ref<HTMLCanvasElement | undefined>()
const state = reactive({
  color: '#000000',
  brushSize: 5,
  drawing: false,
})

const canvasWidth = ref<number>(800)
const canvasHeight = ref<number>(500)

const inputSave = ref<string>('')
const showFiles = ref<boolean>(false)
const myPaintings = ref<IPainting[]>([])

const brushTypes = ref<string[]>([
  'circle', 
  'square', 
  'line', 
  'spray'
])
const selectedBrush = ref<string>(brushTypes.value[0])

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  let canvasElement = document.getElementById("canvasWrapper")

  canvas.width = canvasElement ? canvasElement.clientWidth : 500
  canvas.height = canvasElement ? canvasElement.clientHeight : 500
})

const startDrawing = (event: MouseEvent): void => {
  state.drawing = true
  draw(event)
}

const stopDrawing = (): void => {
  state.drawing = false
}

const draw = (event: MouseEvent): void => {
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

const setSize = (): void => {
  const canvas = canvasRef.value
  if (!canvas) return

  if (canvasWidth.value != 0)
    canvas.width = +canvasWidth.value
  if (canvasHeight.value != 0)
    canvas.height = +canvasHeight.value
  
  console.log(canvas)
}

const savePainting = (text: string): void => {
  const canvas = canvasRef.value
  if(canvas === undefined) return

  const newPainting = {
    _id: '',
    name: text,
    canvas: canvas.toDataURL(),
    uId: userstore.userData?._id,
    height: canvasHeight.value,
    width: canvasWidth.value
  }  as IPainting

    paintstore.postPainting(newPainting)
}

const loadPainting = (painting: string): void => {
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

const setBrushType = (brushType: string): void => {
  selectedBrush.value = brushType
} 

const changeColor = (color: string): void => {
  state.color = color
}
const changeShowFiles = (bool: boolean): void => {
  showFiles.value = bool
  paintstore.getAllPaintingsByUserId(userstore.userData?._id !== undefined ? userstore.userData?._id : '')
}

const itemClicked = (painting: IPainting): void => {
  loadPainting(painting.canvas)
}
</script>