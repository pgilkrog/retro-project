<template>
  <div class="screen-saver absolute z-50 w-full h-full bg-gray-900">
    <span
      ref="textEl"
      class="absolute text-2xl"
      :class="textColor"
    >
      TEXT MOVES AROUND AND BOUNCES OFF THE WALLS
    </span>
  </div>
</template>

<script setup lang="ts">
const textEl = ref<HTMLElement | null>(null)
const x = ref<number>(1)
const y = ref<number>(1)
const xVel = ref<number>(2)
const yVel = ref<number>(2)

const textColor = ref('text-white')
const colors = [
  'text-yellow-500',
  'text-red-500',
  'text-green-500',
  'text-blue-500',
  'text-orange-500',
  'text-indigo-500',
]

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const handleBounce = () => {
  if (x.value + (textEl.value?.offsetWidth ?? 0) >= screenWidth || x.value <= 0) {
    xVel.value *= -1
    textColor.value = colors[Math.floor(Math.random() * 6)]
  }

  if (y.value + (textEl.value?.offsetHeight ?? 0) >= screenHeight || y.value <= 0) {
    yVel.value *= -1
    textColor.value = colors[Math.floor(Math.random() * 6)]
  }
}

onMounted(() => {
  textEl.value = document.querySelector('.screen-saver span')
  handleBounce()

  setInterval(() => {
    x.value += xVel.value
    y.value += yVel.value
    handleBounce()

    if (textEl.value != undefined) {
      textEl.value.style.transform = `translate(${String(x.value)}px, ${String(y.value)}px)`
    }
  }, 10)
})
</script>
