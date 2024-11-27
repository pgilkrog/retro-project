<template>
  <WindowFrame
    :program
    variant="warning"
    :is-not-program="true"
    :is-moveable="true"
    :show-menu="false"
    @close-window="closeWindow()"
  >
    <div 
      class="my-4 flex justify-around" 
      v-if="isLoading === false"
    >
      <div 
        class="flex flex-col items-center cursor-pointer"
        v-for="(item, index) in files" 
        :key="index"
        @click="itemClicked(item)"
      >
        <IconComponent 
          name="bi-file-earmark" 
          size="28" 
        />
        <p>{{ item.name }}</p>
      </div>  
    </div>
    <div 
      v-else 
      class="h-24 flex justify-center items-center"
    >
      <div>
        <IconComponent 
          name="fa-circle-notch" 
          size="28" 
          class="animate-spin" 
          color="gray" 
        />
      </div>
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import type { IFile } from '@/models'

const { files = [], isLoading = false } = defineProps<{
  files: IFile[]
  isLoading: boolean
}>()

const emit = defineEmits<{
  itemClicked: [item: object]
  closeWindow: []
}>()

const program = {
  _id: 245,
  name: 'FileExplorer',
  displayName: 'File explorer',
  image: 'bi-joystick',
  isActive: true,
  color: 'warning',
}

const itemClicked = (item: object) => {
  emit('itemClicked', { ...item })
  emit('closeWindow')
}

const closeWindow = () => {
  emit('closeWindow')
}
</script>
