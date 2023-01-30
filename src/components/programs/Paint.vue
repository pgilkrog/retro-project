<template lang="pug">
WindowFrame(:program="program")
  .paint-wrapper.d-flex
    canvas(
      ref="canvasRef"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
    )
    div
      label Color:
      input(type="color" v-model="color")
    div
      label Brush:
      input(type="range" min="1" max="50" v-model.number="brushSize")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import WindowFrame from '../WindowFrame.vue'
import type { IProgram } from '@/models/index'

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object as PropType<IProgram>
  },
  data() {
    return {
      canvasRef: ref<HTMLCanvasElement | null>(null),
      color: '#000000',
      brushSize: 5,
      drawing: false
    }
  },
  methods: {
    startDrawing(event: MouseEvent) {
      this.drawing = true
      this.draw(event)
    },
    stopDrawing() {
      this.drawing = false
    },
    draw(event: MouseEvent) {
      if (this.drawing === false) return

      const canvas = this.canvasRef
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = this.color
      ctx.arc(event.clientX, event.clientY, this.brushSize, 0, 2 * Math.PI)
      ctx.fill()

    }
  },
  mounted() { 
    this.$nextTick(() => {
      const canvas = this.canvasRef
      debugger
      if(!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight          
    })
  
  }
})
</script>