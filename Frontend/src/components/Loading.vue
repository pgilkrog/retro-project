<template lang="pug">
.loading
  WindowFrame(
    :program="program" 
    :showMenu="false" 
    variant="warning"
    :isMoveable="true"
  )
    .p-4
      .folder-animation 
        i.bi.bi-folder-fill.text-warning
        .box(:class="loadingCompleted === true ? '' : 'move-anim'")
          i.position-absolute.bi.bi-file-earmark-fill.text-white
        i.bi.bi-folder-fill.text-warning
      .loading-bar.bg-shadow-inner.mt-4.d-flex
        .loading-box.bg-primary(v-for="item in progressValues")
      div(v-if="file !== undefined && file.length > 0") {{ file[file.length - 1] }}
      .d-flex.justify-content-end.mt-4
        button.btn(v-if="loadingCompleted === true") Close
    .bg-dark.text-light.p-4
      div Installing...
      div
        div(:style="{ width: progress + '%' }")
      ul
        li(v-for="(file, index) in files" :key="index") {{ file }}
</template>

<script lang="ts">
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import { defineComponent, onMounted, ref } from 'vue'
import type { IProgram } from '@/models/index'

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    loadingTime: Number
  },
  setup (props, { emit }) {
    const program = {
      id: "345345",
      name: 'Loading',
      displayName: 'Loading',
      color: 'info', 
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
        if (progress.value >= 100) {
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
    };

    const generateRandomString = () => {
      const length = 8
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''

      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
      }

      return result
    };

    onMounted(() => {
      addToArray()
      startInstallation()
    })

    return {
      files,
      progress,
      startInstallation,
      program,
      progressValues,
      loadingCompleted,
      addToArray,
      closeLoading
    }
  }
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