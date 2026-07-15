<template>
  <div class="clock-component">
    {{ time }}
  </div>
</template>

<script setup lang="ts">
const time = ref<string>('')

onMounted(() => {
  updateTime()

  setInterval(() => {
    updateTime()
  }, 3000)
})

const updateTime = () => {
  const currentDate = new Date()
  time.value =
    zeroPadding(currentDate.getHours(), 2) + ':' + zeroPadding(currentDate.getMinutes(), 2)
}

const zeroPadding = (num: number, digit: number): string => {
  let zero = ''

  for (let i = 0; i < digit; i++) {
    zero += '0'
  }

  return (zero + String(num)).slice(-digit)
}
</script>
