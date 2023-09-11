<template lang="pug">
WindowFrame(
  :program="props.program"
)
  .paw-eplorer
    .top-bar
      input.bg-shadow-inner
    .browser-content
      iframe(
        height="500"
        width="800"
        src="http://www.pawgilkrog.dk"
      )
</template>
<script setup lang="ts">
import type { IProgram } from '@/models/index'
import type { PropType } from 'vue'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

</script>