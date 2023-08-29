<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true" 
  :showMenu="false"
  :isNotProgram="false"
  variant="info"
)
  .paint-wrapper.d-flex
    .canvas-wrapper.d-flex.h-100.w-100.bg-dark
      canvas.bg-white(
        id="canvasWrapper"
        ref="canvasRef" 
        @mousedown="startDrawing" 
        @mousemove="draw" 
        @mouseup="stopDrawing"
      )
    .tools.bg-shadow.p-4
      .size.mb-4
        input.tb(type="number" v-model="canvasX").w-100.mb-2
        input.tb(type="number" v-model="canvasY").w-100
        button.btn(@click="setSize(canvasX, canvasY)").mt-2 New
      .icons.d-flex.justify-content-between
        button.btn(@click="createNew()")
          IconComponent(name="fa-file" variant="dark" size="18")
        button.btn(type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal")
          IconComponent(name="fa-floppy-disk" variant="dark" size="18")
        button.btn(@click="changeShowFiles(true)")
          IconComponent(name="fa-folder" variant="dark" size="18")
      .brushes.mt-4.d-flex.justify-content-between
        button.btn(type="button" @click="setBrushType('circle')")
          IconComponent(name="fa-circle" variant="dark" size="18")
        button.btn(type="button" @click="setBrushType('square')")
          IconComponent(name="fa-square" variant="dark" size="18")
        button.btn(type="button" @click="setBrushType('spray')")
          IconComponent(name="fa-spray-can" variant="dark" size="18")

        div(class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true")
          div(class="modal-dialog")
            div(class="modal-content")
              div(class="modal-body")
                input(v-model="inputSave")
                button(type="button" class="btn btn-secondary" data-bs-dismiss="modal") Close
                button(type="button" class="btn btn-primary" @click="savePainting(inputSave)") Save changes
      ColorTool(v-on:changeColor="changeColor($event)")
      div.mt-4
        input(type="color" v-model="state.color")
      div
        label Brush Size:
        input(type="range" min="1" max="50" v-model.number="state.brushSize")
  FileExplorer(
    :files="paintstore.usersPaintings" 
    v-if="showFiles === true"
    @itemClicked="itemClicked($event)"
    @closeWindow="changeShowFiles(false)"
  )
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { IPainting } from '@/models/index'
import { userStore } from '@/stores/userStore'
import { paintStore } from '@/stores/paintStore'
import ColorTool from './ColorTool.vue'
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import FileExplorer from '@/components/FileExplorer.vue'

const props = defineProps({
  program: Object
})

const userstore = userStore()
const paintstore = paintStore()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const state = reactive({
  color: '#000000',
  brushSize: 5,
  drawing: false,
})

const canvasX = ref<number>(0)
const canvasY = ref<number>(0)
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
}
const itemClicked = (painting: IPainting) => {
  loadPainting(painting.canvas)
}

onMounted(() => {
  paintstore.getAllPaintingsByUserId(userstore.userData?._id !== undefined ? userstore.userData?._id : '')
  const canvas = canvasRef.value
  if (!canvas) return

  let canvasElement = document.getElementById("canvasWrapper")

  canvas.width = canvasElement ? canvasElement.clientWidth : 500
  canvas.height = canvasElement ? canvasElement.clientHeight : 500
})
</script>
<style scoped lang="sass">
.tools
  width: 200px
</style>