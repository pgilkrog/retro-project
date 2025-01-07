<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    :show-menu="false"
    :is-not-program="false"
    :variant="program.color"
  >
    <div class="paint-wrapper flex justify-between w-[1200px] h-[800px]">
      <div
        v-if="canvasHeight > 0 && canvasWidth > 0"
        class="canvas-wrapper flex w-full h-full overflow-scroll"
      >
        <div
          :width="canvasWidth"
          :height="canvasHeight"
        >
          <canvas
            id="canvasWrapper"
            class="bg-white w-full h-full"
            ref="canvasRef"
            @mousedown="drawing = true"
            @mousemove="draw"
            @mouseup="drawing = false"
          />
        </div>
      </div>

      <!-- Tools Sidebar -->
      <div class="tools bg-shadow flex flex-col p-4 gap-y-4 w-[200px]">
        <div class="size">
          <InputComponent
            type="number"
            v-model="canvasWidth"
            label="Width"
          />
          <InputComponent
            type="number"
            v-model="canvasHeight"
            label="Height"
          />
          <ButtonComponent
            text="new"
            @clicked="newPainting()"
          />
        </div>

        <div class="icons flex justify-center">
          <ButtonComponent
            icon="fa-file"
            size="small"
            @clicked="setSize()"
          />
          <ButtonComponent
            icon="fa-floppy-disk"
            size="small"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
          <ButtonComponent
            icon="fa-folder"
            size="small"
            @clicked="changeShowFiles(true)"
          />
        </div>

        <div class="brushes flex justify-center">
          <ButtonComponent
            icon="fa-circle"
            size="small"
            @clicked="setBrushType('circle')"
          />
          <ButtonComponent
            icon="fa-square"
            size="small"
            @clicked="setBrushType('square')"
          />
          <ButtonComponent
            icon="fa-spray-can"
            size="small"
            @clicked="setBrushType('spray')"
          />
        </div>

        <ColorTool @change-color="(color: string) => changeColor(color)" />

        <div>
          <input
            type="color"
            v-model="brushColor"
          />
        </div>
        <div>
          <label>Brush Size:</label>
          <input
            type="range"
            min="1"
            max="50"
            v-model.number="brushSize"
          />
        </div>
      </div>
    </div>

    <!-- File Explorer -->
    <FileExplorer
      v-if="showFiles === true"
      :is-loading="paintstore.loadingPaintings"
      :files="paintstore.usersPaintings"
      @item-clicked="itemClicked($event)"
      @close-window="changeShowFiles(false)"
    />
  </WindowFrame>
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
const brushTypes = ref<string[]>(['circle', 'square', 'line', 'spray'])

const drawing = ref<boolean>(false)
const brushColor = ref<string>('#000000')
const brushSize = ref<number>(5)
const selectedBrush = ref<string>(brushTypes.value[0])

const canvasWidth = ref<number>(800)
const canvasHeight = ref<number>(500)

// const inputSave = ref<string>('')
const showFiles = ref<boolean>(false)

onMounted(() => {
  const canvas = canvasRef.value
  if (canvas === undefined) return

  const canvasElement = document.getElementById('canvasWrapper')

  canvas.width = canvasElement ? canvasElement.clientWidth : 500
  canvas.height = canvasElement ? canvasElement.clientHeight : 500
})

const draw = (event: MouseEvent) => {
  if (drawing.value === false) return

  const canvas = canvasRef.value
  if (canvas == undefined) return

  const ctx = canvas.getContext('2d')
  if (ctx == undefined) return

  // To center the brush on the mouse, you can use the canvas's getBoundingClientRect() method to calculate the difference between the canvas's top-left corner and the viewport's top-left corner, and then subtract that difference from the clientX and clientY values
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  ctx.fillStyle = brushColor.value

  ctx.beginPath()

  switch (selectedBrush.value) {
    case 'circle':
      ctx.arc(x, y, brushSize.value, 0, 2 * Math.PI)
      break
    case 'square':
      ctx.fillRect(
        x - brushSize.value,
        y - brushSize.value,
        brushSize.value * 2,
        brushSize.value * 2
      )
      break
    case 'line':
      break
    case 'spray':
      for (let i = 0; i < 50; i++) {
        // Adjust the number of dots as needed
        const offsetX = (Math.random() - 0.5) * brushSize.value * 2
        const offsetY = (Math.random() - 0.5) * brushSize.value * 2

        const sprayX = x + offsetX
        const sprayY = y + offsetY

        ctx.fillRect(sprayX, sprayY, 1, 1) // Draw small dots
      }
      break
  }

  ctx.fill()
}

const setSize = () => {
  const canvas = canvasRef.value
  if (canvas == undefined) return

  if (canvasWidth.value != 0) canvas.width = +canvasWidth.value
  if (canvasHeight.value != 0) canvas.height = +canvasHeight.value
}

// const savePainting = (text: string) => {
//   const canvas = canvasRef.value
//   if (canvas === undefined) return

//   const newPainting: IPainting = {
//     _id: '',
//     name: text,
//     canvas: canvas.toDataURL(),
//     uId: userstore.userData?._id ?? 'uid',
//     height: canvasHeight.value,
//     width: canvasWidth.value,
//   }

//   paintstore.postPainting(newPainting)
// }

const newPainting = () => {
  console.log('new')
}

const loadPainting = (painting: string) => {
  const canvas = canvasRef.value
  if (canvas == undefined) return

  const ctx = canvas.getContext('2d')
  if (ctx == undefined) return

  const image = new Image()
  image.src = painting
  image.onload = () => {
    canvas.width = image.width
    canvas.height = image.height

    const ctx = canvas.getContext('2d')
    if (ctx == undefined) return

    ctx.drawImage(image, 0, 0)
  }
}

const setBrushType = (brushType: string) => {
  selectedBrush.value = brushType
}

const changeColor = (color: string) => {
  brushColor.value = color
}

const changeShowFiles = async (bool: boolean) => {
  showFiles.value = bool

  if (bool === true) {
    await paintstore.getAllPaintingsByUserId(userstore.userData?._id ?? '')
  }
}

const itemClicked = (painting: IPainting) => {
  loadPainting(painting.canvas)
}
</script>
