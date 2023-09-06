<template lang="pug">
WindowFrame(
  :program="program" 
  variant="warning"
  :isNotProgram="true"
  :isMoveable="true"
  :showMenu="false"
  @closeWindow="closeWindow()"
)
  .file-explorer.my-4.d-flex.justify-content-around
    .d-flex.flex-column.align-items-center.pointer(
      v-for="(item, index) in files" 
      :key="index"
      @click="itemClicked(item)"
    )
      IconComponent(name="bi-file-earmark" size="28")
      p {{ item.name }}
</template>

<script setup lang="ts">
import type { IFile } from '@/models'
import type { PropType } from 'vue'

const props = defineProps({
  files: Array as PropType<IFile[]>
})

const emit = defineEmits([
  'itemClicked',
  'closeWindow'
])

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

</script>