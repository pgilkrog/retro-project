<template lang="pug">
WindowFrame(
  :program="program" 
  variant="warning"
  :isNotProgram="true"
  :isMoveable="true"
  :showMenu="false"
  @closeWindow="closeWindow()"
)
  .file-explorer(class="my-4 flex justify-around" v-if="isLoading === false")
    div(
      class="flex flex-col items-center cursor-pointer"
      v-for="(item, index) in files" 
      :key="index"
      @click="itemClicked(item)"
    )
      IconComponent(name="bi-file-earmark" size="28")
      p {{ item.name }}
  .is-loading(v-else class="h-24 flex justify-center items-center")
    div
      IconComponent(name="fa-circle-notch" size="28" class="animate-spin" color="gray")
</template>

<script setup lang="ts">
import type { IFile } from '@/models'
import type { PropType } from 'vue'

const { 
  files = [], 
  isLoading = false 
} = defineProps({
  files: Array as PropType<IFile[]>,
  isLoading: Boolean
})

const emit = defineEmits([
  'itemClicked',
  'closeWindow'
])

const program = {
  _id: 245,
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