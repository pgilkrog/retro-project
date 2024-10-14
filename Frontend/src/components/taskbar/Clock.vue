<template lang="pug">
.clock-text(@click="addBug()") {{ time }}
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore'

const time = ref('')
const errorstore = useErrorStore()

const updateTime = () => {
  var cd = new Date()
  time.value = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2)
}
const zeroPadding = (num: number, digit: number) => {
  var zero = ''
  for (var i = 0; i < digit; i++) {
    zero += '0'
  }
  return (zero + num).slice(-digit)
}

const addBug = () => {
  errorstore.setError('Something went wrong lol :D')
}

onMounted(() => {
  updateTime()
  setInterval(() => updateTime(), 3000)
})
</script>
