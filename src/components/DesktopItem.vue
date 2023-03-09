<template lang="pug">
.desktop-item.d-flex.flex-column.align-items-center.pointer.m-1(@click="itemPressed()" :class="itemColor ? 'text-' + itemColor : 'text-success'")
  i(:class="'bi ' + program.Image" style="font-size: 3rem")
  .text-light  {{ program.DisplayName }}
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { IProgram } from '@/models/index';
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    program: Object as PropType<IProgram>,
    itemColor: String
  },
  setup (props, { emit }) {
    const itemPressed = () => {
      emit('generateComponent')
    }

    return {
      itemPressed
    }
  }
})
</script>