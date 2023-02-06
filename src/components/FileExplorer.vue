<template lang="pug">
WindowFrame(
  :program="program" 
  variant="warning"
  @closeWindow="closeWindow()"
  :isNotProgram="true"
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
import WindowFrame from '@/components/WindowFrame.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    WindowFrame
  },
  props: {
    files: Array
  },
  data() {
    return {
      program: {
        Id: 245,
        Name: "FileExplorer",
        DisplayName: "File explorer",
        Image: "bi-joystick", 
        IsActive: true,
        Color: "warning"
      }
    }
  },
  methods: {
    itemClicked(item: any) {
      this.$emit('itemClicked', {...item})
      this.$emit('closeWindow')
    },
    closeWindow() {
      this.$emit('closeWindow')
    }
  }
})
</script>