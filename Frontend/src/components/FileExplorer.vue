<template lang="pug">
WindowFrame(
  :program="program" 
  variant="warning"
  :isNotProgram="true"
  :isMoveable="true"
  :showMenu="false"
  @closeWindow="closeWindow()"
)
  .file-explorer
    span.d-flex.flex-column.align-items-center.pointer(
      v-for="(item, index) in files" 
      :key="index"
      @click="itemClicked(item)"
    )
      h1.bi.bi-file-earmark
      p {{ item.Name }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    files: Array
  },
  setup (props, { emit }) {
    const program = {
      id: 245,
      name: "FileExplorer",
      displayName: "File explorer",
      image: "bi-joystick", 
      isActive: true,
      color: "warning"
    }

    const itemClicked = (item: any) => {
      emit('itemClicked', {...item})
      emit('closeWindow')
    }

    const closeWindow = () => {
      emit('closeWindow')
    }

    return {
      program,
      itemClicked,
      closeWindow
    }
  }
})
</script>