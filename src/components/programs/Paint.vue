<template lang="pug">
WindowFrame(:program="program")
  .paint-wrapper.d-flex
    canvas.bg-white(
      ref="canvasRef" 
      @mousedown="startDrawing" 
      @mousemove="draw" 
      @mouseup="stopDrawing"
    )
    div.m-4
      .icons
        button.btn(type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal")
          i.icon.bi.bi-save
        button.btn
          i.icon.bi.bi-folder-fill

        div(class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true")
          div(class="modal-dialog")
            div(class="modal-content")
              div(class="modal-body")
                input(v-model="inputSave")
                button(type="button" class="btn btn-secondary" data-bs-dismiss="modal") Close
                button(type="button" class="btn btn-primary" @click="saveDrawing(inputSave)") Save changes
      .color-wrapper
        .d-flex.flex-wrap(style="width: 250px")
          button.btn.btn-color.bg-shadow-inner(
            v-for="(color, index) in colors"
            :key="index"
            @click="changeColor(color)"
            :style="'background: '+ color"
          ) 
      div.mt-4
        label Color:
        input(type="color" v-model="state.color")
      div
        label Brush Size:
        input(type="range" min="1" max="50" v-model.number="state.brushSize")
      div
        p dfg
        p(
          v-for="item in myPaintings" 
          @click="loadPainting(item.canvas)"
          :key="item.Id"
        ) {{ item.name }} 
</template>

<script lang="ts">
import { userStore } from '@/stores/userStore';
import { ref, reactive, onMounted } from 'vue'
import WindowFrame from '../WindowFrame.vue'
import DBHelper from '@/helpers/DBHelper'
import type { IPainting } from '@/models/index'

export default {
  props: {
    program: Object
  },
  components: {
    WindowFrame
  },
  data() {
    return {
      inputSave: '',
      userstore: userStore(),
      myPaintings: [] = [] as IPainting[],
      colors: [
        '#0000ff',
        '#00ff00',
        '#ff0000',
        '#ffff00',
        '#00ffff',
        '#ff00ff',
        '#ffffff',
        '#000000'
      ]
    }
  },
  methods: {
    changeColor(color: string) {
      this.state.color = color
    }
  },
  mounted() {
    DBHelper.getAllByUserId('paintings', this.userstore.getUser.uid).then(data => {
      this.myPaintings = data as IPainting[]
    })
  },
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const userstore = userStore()
    const state = reactive({
      color: '#000000',
      brushSize: 5,
      drawing: false,
    })

    function startDrawing(event: MouseEvent) {
      state.drawing = true
      draw(event)
    }

    function stopDrawing() {
      state.drawing = false
    }

    function draw(event: MouseEvent) {
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

    function savePainting (text: string) {
      const canvas = canvasRef.value
      if(canvas === null) return

      DBHelper.create('paintings', {
        name: text,
        userId: userstore.getUser.uid,
        canvas: canvas.toDataURL()
      })
    }

    function loadPainting (painting: any) {
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

    onMounted(() => {
      const canvas = canvasRef.value
      if (!canvas) return

      canvas.width = 1200
      canvas.height = 1000
    });

    return {
      canvasRef,
      state,
      startDrawing,
      stopDrawing,
      draw,
      savePainting,
      loadPainting
    };
  },
};
</script>
