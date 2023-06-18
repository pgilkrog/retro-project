<template lang="pug">
.background-images-wrapper.bg-light.bg-shadow-inner.d-flex.flex-column
  .image-item.m-1.d-flex.align-items-center.p-1.hover-bg-primary.pointer(
    @click="imageClicked({})"
    :class="(tempImg === undefined) ? 'bg-primary color-white' : ''"
  )
    IconComponent.me-3(name="fa-file-excel")
    p.text-ellips-1(style="height: 14px") No background
  .image-item.m-1.d-flex.align-items-center.p-1.pointer.hover-bg-info(
    v-for="(item, index) in images" 
    :key="index"
    @click="imageClicked(item)"
    :class="(tempImg !== undefined && tempImg.name === item.name) ? 'bg-primary text-white' : ''"
  )
    IconComponent.me-3(name="fa-file-image")
    p.text-ellips-1(style="height: 14px") {{ item.originalName || item.name }}

.settings 
  select
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

const props = defineProps({
  tempImg: Object 
})

const emit = defineEmits([
  'setTempImg'
])

const userstore = userStore()
const filestore = fileStore()

const userData = storeToRefs(userstore).userData    
const images = computed(() => filestore.allFiles)

const imageClicked = (file: IFile) => {
  emit('setTempImg', file)
}
</script>

<style lang="sass" scoped>
.background-images-wrapper
  height: 150px
  overflow: auto
</style>