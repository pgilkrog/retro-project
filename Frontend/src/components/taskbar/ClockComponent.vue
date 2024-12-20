<template>
  <div class="clock-component">
    {{ time }}
  </div>
</template>

<script setup lang="ts">
const time = ref<string>('')

const updateTime = () => {
  const cd = new Date()
  time.value = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2)
}

const zeroPadding = (num: number, digit: number): string => {
  let zero = ''

  for (let i = 0; i < digit; i++) {
    zero += '0'
  }

  return (zero + num.toString()).slice(-digit)
}

onMounted(() => {
  updateTime()

  setInterval(() => {
    updateTime()
  }, 3000)
})
</script>
