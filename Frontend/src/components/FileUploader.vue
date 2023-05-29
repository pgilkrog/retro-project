<template lang="pug">
form(@submit.prevent="uploadFile").file-uploader
  input(
    type="file"
    ref="fileInput"
    @change="selectFile"
    placeholder="hejsa"
  )
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { fileStore } from '@/stores/fileStore'

export default defineComponent({
  name: 'file-uploader',
  setup() {
    const file = ref()
    const filestore = fileStore()
    
    const selectFile = (event: any) => {
      file.value = event.target.files[0]
    }

    const uploadFile = () => {
      const formData = new FormData()
      formData.append('file', file.value)

      filestore.uploadFile(formData)
    }

    return {
      file,
      selectFile,
      uploadFile
    }
  }
})
</script>

<style lang="sass" scoped>
</style>