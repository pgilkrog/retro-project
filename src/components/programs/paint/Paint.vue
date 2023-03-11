<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .paint-wrapper.row.gx-0
    .col-10
      .canvas-wrapper.d-flex.h-100.w-100.text-black.bg-grey
        canvas.bg-white(
          id="canvasWrapper"
          ref="canvasRef" 
          @mousedown="startDrawing" 
          @mousemove="draw" 
          @mouseup="stopDrawing"
        )
    .col-2.bg-shadow.p-4
      .size.mb-4
        input.tb(type="number" v-model="canvasX").w-100.mb-2
        input.tb(type="number" v-model="canvasY").w-100
        button.btn(@click="setSize(canvasX, canvasY)").mt-2 New
      .icons
        button.btn(type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal")
          i.icon.bi.bi-save
        button.btn(@click="changeShowFiles(true)")
          i.icon.bi.bi-folder-fill

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
    :files="myPaintings" 
    v-if="showFiles === true"
    @itemClicked="itemClicked($event)"
    @closeWindow="changeShowFiles(false)"
  )
</template>

<script lang="ts">
import { userStore } from '@/stores/userStore';
import { ref, reactive, onMounted } from 'vue'
import WindowFrame from '../../WindowFrame.vue'
import FileExplorer from '@/components/FileExplorer.vue'
import DBHelper from '@/helpers/DBHelper'
import { IPainting } from '@/models/index'
import { defineComponent } from 'vue'
import ColorTool from './ColorTool.vue'

export default defineComponent({
  props: {
    program: Object
  },
  components: {
    WindowFrame,
    FileExplorer,
    ColorTool
  },
  setup (props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const userstore = userStore()
    const state = reactive({
      color: '#000000',
      brushSize: 5,
      drawing: false,
    })

    const canvasX = ref(undefined)
    const canvasY = ref(undefined)
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
      ctx.arc(x, y, state.brushSize, 0, 2 * Math.PI)
      ctx.fill()
    }

    const savePainting = (text: string) => {
      const canvas = canvasRef.value
      if(canvas === null) return

      let newPainting = new IPainting (
        '',
        text, 
        canvas.toDataURL(),
        userstore.getUser.uid
      )

      DBHelper.create('paintings', newPainting)
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
    }

    const changeColor = (color: string) => {
      state.color = color
    }
    const changeShowFiles = (bool: boolean) => {
      showFiles.value = bool
    }
    const itemClicked = (painting: IPainting) => {
      loadPainting(painting.Canvas)
    }

    onMounted(() => {
      const canvas = canvasRef.value
      if (!canvas) return

      let canvasElement = document.getElementById("canvasWrapper")

      canvas.width = canvasElement ? canvasElement.clientWidth : 500
      canvas.height = canvasElement ? canvasElement.clientHeight : 500

      DBHelper.getAllByUserId('paintings', userstore.getUser.uid).then(data => {
        myPaintings.value = data as IPainting[]
      })
    })

    return {
      canvasRef,
      state,
      canvasX,
      canvasY,
      inputSave,
      brushSizes,
      showFiles,
      myPaintings,
      startDrawing,
      stopDrawing,
      draw,
      savePainting,
      loadPainting,
      setSize,
      changeColor,
      changeShowFiles,
      itemClicked
    }
  },
})
</script>
