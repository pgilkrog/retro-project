<template lang="pug">
.background-images-wrapper(class="bg-gray-300 bg-shadow-inner flex flex-col rounded h-40 overflow-auto")
  .image-item(
    class="m-1 flex items-center hover:bg-blue-500 p-1 cursor-pointer"
    @click="imageClicked(undefined)"
    :class="(tempImg === undefined) ? 'bg-blue-500 text-white' : ''"
  )
    IconComponent(name="fa-file-excel" class="me-3")
    p.text-ellips-1(style="height: 14px") No background
  .image-item(
    class="m-1 flex items-center p-1 cursor-pointer hover:bg-blue-500"
    v-for="item in images" 
    :key="item._id"
    @click="imageClicked(item)"
    :class="(tempImg !== undefined && tempImg.name === item.name) ? 'bg-blue-500 text-white' : ''"
  )
    IconComponent(name="fa-file-image" class="me-3")
    p(class="text-ellipsis") {{ item.originalName || item.name }}

.settings 
  select(v-model="displayOption")
    option(value="stretch") Stretch 
    option(value="fill") Fill
    option(value="fit") Fit
    option(value="center") Center
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { fileStore } from '../../../stores/fileStore'
import type { IFile } from '@/models'

const { tempImg } = defineProps<{
  tempImg?: IFile
}>()

const emit = defineEmits<{
  setTempImg: [item: IFile | undefined]
}>()

const userstore = userStore()
const filestore = fileStore()

const displayOption = ref<string>('')
const userData = storeToRefs(userstore).userData
const images = computed(() => filestore.allFiles)

const imageClicked = async (file: IFile) => {
  await emit('setTempImg', undefined)
  await emit('setTempImg', file)
}
</script>
