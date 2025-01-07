<template>
  <form
    class="file-uploader flex items-center"
    @submit.prevent="uploadFile"
  >
    <input
      type="file"
      ref="fileInput"
      @change="selectFile"
    />
    <ButtonComponent
      text="Submit"
      type="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { fileStore } from '@/stores/fileStore'

const filestore = fileStore()
const file = ref<File | null>(null)

const selectFile = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (input.files != undefined && input.files.length > 0) {
    file.value = input.files[0]
  }
}

const uploadFile = () => {
  if (file.value === null) {
    console.error('No file selected')
    return
  }

  const formData = new FormData()
  formData.append('image', file.value)

  filestore.uploadFile(formData).then(() => {
    file.value = null
  })
}
</script>
