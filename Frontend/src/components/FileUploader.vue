<template lang="pug">
form(@submit.prevent="uploadFile").file-uploader.d-flex.align-items-center
  input(
    type="file"
    ref="fileInput"
    @change="selectFile"
  ) 
  //- button.btn.ms-4(type="submit") Submit
  ButtonComponent(text="Submit" type="submit")
</template>

<script setup lang="ts">
import { fileStore } from '@/stores/fileStore'

const file = ref()
const filestore = fileStore()

const selectFile = (event: any) => {
  file.value = event.target.files[0]
}

const uploadFile = () => {
  if (!file) return

  const formData = new FormData()
  formData.append('image', file.value)

  filestore.uploadFile(formData).then(() => {
    file.value = undefined
  })
}
</script>
