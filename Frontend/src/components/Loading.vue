<template lang="pug">
.loading
  WindowFrame(
    :program="program" 
    :showMenu="false" 
    :isMoveable="true"
    @closeWindow="emit('close-loading')"
  )
    .p-4
      .folder-animation(class="flex justify-between")
        IconComponent(name="bi-folder-fill" color="yellow" size="32" class="z-20")
        .box(:class="loadingCompleted === true ? '' : 'move-anim'")
          IconComponent(name="bi-file-earmark-fill" class="text-white" size="32" class="z-10")
        IconComponent(name="bi-folder-fill" color="yellow" size="32" class="z-20")
      .loading-bar(:class="['bg-shadow-inner mt-4 flex', progressValues.lenth > 0 ? 'h-auto' : 'h-5']")
        .loading-box.bg-blue-500.h-5.w-5.mx-1(v-for="item in progressValues")
      div(class="flex justify-end mt-4")
        ButtonComponent(text="Close" v-if="loadingCompleted === true" @clicked="emit('close-loading')")
    .text-black.p-4
      div Installing...
      div
        div(:style="{ width: progress + '%' }")
      ul
        li(v-for="(file, index) in files.slice(files.length-1, files.length)" :key="index") {{ file }}
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'

const { loadingTime = 10 } = defineProps<{
  loadingTime: number
}>()

const emit = defineEmits<{
  (e: 'close-loading'): void 
}>()

const program = {
  _id: "345345",
  name: 'Loading',
  displayName: 'Loading',
  color: 'blue', 
  isActive: true, 
  image: 'bi-archive',
  left: 40,
  top: 40,
  sortOrder: 0,
  type: 'Program'
} as IProgram

const loadingCompleted = ref(false)
const progressValues = ref<number[]>([])
const files = ref<string[]>([])
const progress = ref<number>(0)

const addToArray = () => {
  if (progressValues.value.length < 13) {
    setTimeout(() => {
      progressValues.value.push(1)
      addToArray()
    }, Math.random() * 1000 + 100)
  }

  if (progressValues.value.length === 12) {
    loadingCompleted.value = true
  }
}

const startInstallation = () => {
  const fileTypes = ['exe', 'dll', 'cfg', 'log']
  const installationTime = 8000 // 5 seconds

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