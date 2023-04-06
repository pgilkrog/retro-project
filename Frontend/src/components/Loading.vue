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
        .box 
          i.position-absolute.bi.bi-file-earmark-fill.text-white
        i.bi.bi-folder-fill.text-warning
      .loading-bar.bg-shadow-inner.mt-4.d-flex
        .loading-box.bg-primary(v-for="item in progressValues")
      .d-flex.justify-content-end.mt-4
        button.btn(v-if="loadingCompleted === true") Close
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
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
    
    const addToArray = () => {
      if (progressValues.value.length < 10) {
        setTimeout(() => {
          progressValues.value.push(1)
          addToArray()
        }, Math.random() * 1000 + 100) // wait for a random time between 100 and 1100 milliseconds
      }

      if (progressValues.value.length === 10) {
        loadingCompleted.value = true
      }
    }

    const closeLoading = () => {
      emit('closeLoading')
    }

    onMounted(() => {
      addToArray()
    })

    return {
      program,
      progressValues,
      loadingCompleted,
      addToArray,
      closeLoading
    }
  }
})
</script>

<style>
.box {
  position: absolute;
  animation: move 2s ease-in-out infinite;
}
@keyframes move {
  from {
    left: 20px;
  }
  to {
    left: calc(100% - 50px);
  }
}
</style>