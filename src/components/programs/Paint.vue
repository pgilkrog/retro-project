<template lang="pug">
WindowFrame(:program="program")
  .paint-wrapper.row.gx-0
    .tools-container(style="width: 200px;")
    .bg-white.light-border(style="width: 500px; height: 500px;")

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import WindowFrame from '../WindowFrame.vue'
import type { IProgram } from '@/models/index'

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    program: Object as PropType<IProgram>
  },
  data() {
    return {

    }
  },
  methods: {
  }
})
</script>