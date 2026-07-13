<template>
  <div class="fileuploader">
    <div
      v-if="previewUrl !== ''"
      class="mb-2"
    >
      <img
        :src="previewUrl"
        alt="Preview"
        class="max-h-40"
      />
    </div>
    <form
      class="file-uploader flex items-center"
      @submit.prevent="() => uploadFile()"
    >
      <input
        type="file"
        ref="fileInput"
        @change="selectFile"
      />
      <ButtonComponent
        text="Upload file"
        type="submit"
        :is-loading="isUploading"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { fileStore } from '@/stores/fileStore'
import { storeToRefs } from 'pinia'

const filestore = fileStore()
const { isUploading } = storeToRefs(filestore)

const file = ref<File | null>(null)
const previewUrl = ref<string>('')

const selectFile = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (input.files != undefined && input.files.length > 0) {
    file.value = input.files[0]

    // Clean up previous preview
    if (previewUrl.value !== '') {
      URL.revokeObjectURL(previewUrl.value)
    }

    previewUrl.value = URL.createObjectURL(file.value)
  }
}

const uploadFile = async () => {
  if (file.value == null) {
    console.error('No file selected')
    return
  }

  const formData = new FormData()
  formData.append('image', file.value)

  const fileUploaded = await filestore.uploadFile(formData)

  file.value = null

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  previewUrl.value = ''
}
</script>
