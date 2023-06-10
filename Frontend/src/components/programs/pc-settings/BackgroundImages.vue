<template lang="pug">
.row
  .background-images-wrapper.bg-light.bg-shadow-inner.d-flex.flex-column
    .image-item.m-1.d-flex.align-items-center.p-1(@click="imageClicked(undefined)")
      IconComponent.me-3(name="fa-file-excel")
      p.text-ellips-1(style="height: 14px") No background
    .image-item.m-1.d-flex.align-items-center.p-1(
      v-for="(item, index) in images" 
      :key="index"
      @click="imageClicked(item)"
      :class="userData.settings.backgroundImage === item.name ? 'bg-primary color-white' : ''"
    )
      IconComponent.me-3(name="fa-file-image")
      p.text-ellips-1(style="height: 14px") {{ item.originalName || item.name }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { fileStore } from '../../../stores/fileStore'
import type { IFile } from '@/models'

export default defineComponent({
  name: 'background-images',
  setup(props, {emit}) {
    const userstore = userStore()
    const filestore = fileStore()

    const userData = storeToRefs(userstore).userData    
    const images = computed(() => filestore.allFiles)

    const imageClicked = (file: IFile) => {
      emit('setTempImg', file)
    }

    return {
      userData,
      images,
      imageClicked
    }
  }
})
</script>

<style lang="sass" scoped>

</style>