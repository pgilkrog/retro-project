<template lang="pug">
.loading
  WindowFrame(
    :program="program" 
    :showMenu="false" 
    :isMoveable="true"
    @closeWindow="closeLoading()"
  )
    .p-4
      .folder-animation 
        IconComponent(name="bi-folder-fill" variant="warning" size="32")
        .box(:class="loadingCompleted === true ? '' : 'move-anim'")
          IconComponent(name="bi-file-earmark-fill" variant="white" size="32")
        IconComponent(name="bi-folder-fill" variant="warning" size="32")
      .loading-bar.bg-shadow-inner.mt-4.d-flex
        .loading-box.bg-primary(v-for="item in progressValues")
      .d-flex.justify-content-end.mt-4
        Btn(name="Close" v-if="loadingCompleted === true" @clicked="closeLoading()")
    .bg-dark.text-light.p-4
      div Installing...
      div
        div(:style="{ width: progress + '%' }")
      ul
        li(v-for="(file, index) in files.slice(files.length-1, files.length)" :key="index") {{ file }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { IProgram } from '@/models/index'

const { loadingTime = 10 } = defineProps({
  loadingTime: Number
})

const emit = defineEmits([
  'closeLoading'
])

const program = {
  _id: "345345",
  name: 'Loading',
  displayName: 'Loading',
  color: 'blue', 
  isActive: true, 
  image: 'bi-archive',
} as IProgram

const loadingCompleted = ref(false)
const progressValues = ref<number[]>([])
const files = ref<string[]>([])
const progress = ref<number>(0)

const addToArray = () => {
  if (progressValues.value.length < 10) {
    setTimeout(() => {
      progressValues.value.push(1)
      addToArray()
    }, Math.random() * 1000 + 100)
  }

  if (progressValues.value.length === 10) {
    loadingCompleted.value = true
  }
}

const closeLoading = () => {
  emit('closeLoading')
}

const startInstallation = () => {
  const fileTypes = ['exe', 'dll', 'cfg', 'log']
  const installationTime = 5000 // 5 seconds

  const intervalId = setInterval(() => {
    if (progress.value >= 200) {
      clearInterval(intervalId)
      return
    }

    const fileName = `${generateRandomString()}.${fileTypes[Math.floor(Math.random() * fileTypes.length)]}`
    files.value.push(fileName)

    progress.value += Math.random() * 5
    progress.value = Math.min(progress.value, 100)
  }, 100)

  setTimeout(() => {
    clearInterval(intervalId)
    files.value = []
    progress.value = 100
  }, installationTime)
}

const generateRandomString = () => {
  const length = 8
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

onMounted(() => {
  addToArray()
  startInstallation()
})
</script>

<style lang="sass" scoped>
.box 
  position: absolute

.move-anim 
  animation: move 2s ease-in-out infinite

@keyframes move 
  from 
    left: 20px
  to 
    left: calc(100% - 50px)
</style>