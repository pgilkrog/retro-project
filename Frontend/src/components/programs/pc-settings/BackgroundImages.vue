<template>
  <div
    class="background-images-wrapper bg-gray-300 bg-shadow-inner flex flex-col h-40 overflow-auto"
  >
    <div
      class="image-item m-1 flex items-center hover:bg-blue-500 p-1 cursor-pointer"
      @click="imageClicked(undefined)"
      :class="tempImg === undefined ? 'bg-blue-500 text-white' : ''"
    >
      <IconComponent
        name="fa-file-excel"
        class="me-3"
      />
      <p
        class="text-ellips-1"
        style="height: 14px"
      >
        No background
      </p>
    </div>
    <div
      class="image-item m-1 flex items-center p-1 cursor-pointer hover:bg-blue-500"
      v-for="item in images"
      :key="item._id"
      @click="imageClicked(item)"
      :class="tempImg !== undefined && tempImg.name === item.name ? 'bg-blue-500 text-white' : ''"
    >
      <IconComponent
        name="fa-file-image"
        class="me-3"
      />
      <p class="text-ellipsis">
        {{ item.originalName || item.name }}
      </p>
    </div>
  </div>
  <div class="settings">
    <select v-model="displayOption">
      <option value="stretch">Stretch</option>
      <option value="fill">Fill</option>
      <option value="fit">Fit</option>
      <option value="center">Center</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { fileStore } from '../../../stores/'
import type { IFile } from '@/models'

const { tempImg } = defineProps<{
  tempImg?: IFile
}>()

const emit = defineEmits<{
  setTempImg: [item: IFile | undefined]
}>()

const filestore = fileStore()

const displayOption = ref<string>('')
const images = computed(() => filestore.userFiles)

const imageClicked = (file: IFile | undefined) => {
  emit('setTempImg', file)
}
</script>
