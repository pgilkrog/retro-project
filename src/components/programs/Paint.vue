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
      .color-wrapper
        .d-flex.flex-wrap(style="width: 250px")
          button.btn.bg-shadow-inner(
            @click="changeColor('#0000ff')"
            style="background: #0000ff"
          ) 
          button.btn.bg-shadow-inner(
            @click="changeColor('#00ff00')"
            style="background: #00ff00"
          ) 
          button.btn.bg-shadow-inner(
            @click="changeColor('#ff0000')"
            style="background: #ff0000"
          ) 
          button.btn.bg-shadow-inner(
            @click="changeColor('#ffff00')"
            style="background: #ffff00"
          ) 
          button.btn.bg-shadow-inner(
            @click="changeColor('#00ffff')"
            style="background: #00ffff"
          ) 
          button.btn.bg-shadow-inner(
            @click="changeColor('#ff00ff')"
            style="background: #ff00ff"
          )
          button.btn.bg-shadow-inner(
            @click="changeColor('#ffffff')"
            style="background: #ffffff"
          )
          button.btn.bg-shadow-inner(
            @click="changeColor('#000000')"
            style="background: #000000"
          ) 
      div.mt-4
        label Color:
        input(type="color" v-model="state.color")
      div
        label Brush Size:
        input(type="range" min="1" max="50" v-model.number="state.brushSize")
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue'
import WindowFrame from '../WindowFrame.vue'

export default {
  props: {
    program: Object
  },
  components: {
    WindowFrame
  },
  methods: {
    changeColor(color: string) {
      this.state.color = color
    }
  },
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
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
    };
  },
};
</script>
