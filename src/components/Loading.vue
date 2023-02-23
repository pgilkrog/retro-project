<template lang="pug">
.loading
  WindowFrame(
    :program="program" 
    :showMenu="false" 
    variant="info"
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
</template>

<script lang="ts">
import WindowFrame from './WindowFrame.vue'
import { defineComponent } from 'vue'
import type { IProgram } from '@/models/index'

export default defineComponent({
  components: {
    WindowFrame
  },
  data() {
    return {
      program: {
        Id: 543, 
        Name: 'Loading', 
        IsActive: true, 
        Image: 'bi-archive'
      } as IProgram,
      progressValues: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  methods: {
    startLoading() {

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