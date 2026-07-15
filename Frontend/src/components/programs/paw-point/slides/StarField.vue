<template>
  <div class="starfield absolute z-[999]">
    <canvas ref="canvas" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Star {
  x: number
  y: number
  z: number
  speed: number
  prevX: number
  prevY: number
  color: string
}

const canvas = ref<HTMLCanvasElement | null>(null)
let animationFrame = 0
let stars: Star[] = []

const createStar = (width: number, height: number): Star => {
  const angle = Math.random() * Math.PI * 2
  const radius = Math.random() * Math.min(width, height) * 0.35

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    z: 0.3 + Math.random() * 1.7,
    speed: 0.25 + Math.random() * 0.75,
    prevX: width / 2,
    prevY: height / 2,
    color: Math.random() > 0.7 ? '#8ddcff' : '#ffffff',
  }
}

const resetStar = (star: Star, width: number, height: number) => {
  const angle = Math.random() * Math.PI * 2
  const radius = Math.random() * Math.min(width, height) * 0.35

  star.x = Math.cos(angle) * radius
  star.y = Math.sin(angle) * radius
  star.z = 0.3 + Math.random() * 1.7
  star.speed = 0.25 + Math.random() * 0.75
  star.prevX = width / 2
  star.prevY = height / 2
}

const resize = () => {
  const el = canvas.value
  if (!el) return

  const parent = el.parentElement
  if (!parent) return

  const dpr = window.devicePixelRatio || 1
  const width = parent.clientWidth
  const height = parent.clientHeight

  el.width = width * dpr
  el.height = height * dpr

  const context = el.getContext('2d')
  if (!context) return

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  stars = Array.from({ length: Math.min(180, Math.floor((width * height) / 14000)) }, () =>
    createStar(width, height)
  )
}

const animate = () => {
  const el = canvas.value
  if (!el) return

  const context = el.getContext('2d')
  if (!context) return

  const width = el.clientWidth
  const height = el.clientHeight
  const centerX = width / 2
  const centerY = height / 2
  const depthScale = Math.min(width, height) / 2.2

  context.clearRect(0, 0, width, height)
  context.fillStyle = '#000000'
  context.fillRect(0, 0, width, height)

  stars.forEach((star) => {
    const previousX = star.prevX
    const previousY = star.prevY

    star.z -= 0.02 * star.speed
    if (star.z <= 0.2) {
      resetStar(star, width, height)
    }

    const x = (star.x / star.z) * depthScale + centerX
    const y = (star.y / star.z) * depthScale + centerY

    context.strokeStyle = star.color
    context.lineWidth = Math.max(0.6, 1.2 / star.z)
    context.beginPath()
    context.moveTo(previousX, previousY)
    context.lineTo(x, y)
    context.stroke()

    star.prevX = x
    star.prevY = y
  })

  animationFrame = window.requestAnimationFrame(animate)
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  animationFrame = window.requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.starfield {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000000;
}

.starfield canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
