<template>
  <form 
    @submit.prevent="uploadFile" 
    class=".file-uploader.d-flex.align-items-center"
  >
    <input
      type="file"
      ref="fileInput"
      @change="selectFile"
    >
    <ButtonComponent 
      text="Submit" 
      type="submit" 
    />
  </form>
</template>

<script setup lang="ts">
import { fileStore } from '@/stores/fileStore'

const file = ref()
const filestore = fileStore()

const selectFile = (event: any) => {
  file.value = event.target.files[0]
}

const uploadFile = () => {
  const formData = new FormData()
  formData.append('image', file.value)

  filestore.uploadFile(formData).then(() => {
    file.value = undefined
  })
}
</script>
