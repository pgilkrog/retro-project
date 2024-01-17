<template lang="pug">
.background-images-wrapper(class="bg-gray-300 bg-shadow-inner bg- d-flex flex-col rounded h-40 overflow-auto")
  .image-item(
    class="m-1 flex items-center hover:bg-gray-500 p-1 cursor-pointer"
    @click="imageClicked(undefined)"
    :class="(tempImg === undefined) ? 'bg-primary color-white' : ''"
  )
    IconComponent.me-3(name="fa-file-excel")
    p.text-ellips-1(style="height: 14px") No background
  .image-item(
    class="m-1 flex items-center p-1 cursor-pointer hover:bg-blue-500"
    v-for="item in images" 
    :key="item._id"
    @click="imageClicked(item)"
    :class="(tempImg !== undefined && tempImg.name === item.name) ? 'bg-blue-500 text-white' : ''"
  )
    IconComponent.me-3(name="fa-file-image")
    p(class="text-ellipsis") {{ item.originalName || item.name }}

.settings 
  select(v-model="displayOption")
    option(value="stretch") Stretch 
    option(value="fill") Fill
    option(value="fit") Fit
    option(value="center") Center
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { fileStore } from '../../../stores/fileStore'
import type { IFile } from '@/models'

const { tempImg } = defineProps({
  tempImg: Object as PropType<IFile>
})

const emit = defineEmits([
  'setTempImg'
])

const userstore = userStore()
const filestore = fileStore()

const displayOption = ref<string>('')
const userData = storeToRefs(userstore).userData    
const images = computed(() => filestore.allFiles)

const imageClicked = (file: IFile) => {
  emit('setTempImg', file)
}
</script>
