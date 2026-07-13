<template>
  <div class="displaysettings content p-4 border border-t-0 border-black">
    <div class="row flex flex-col items-center">
      <PCScreen :temp-img="tempImg" />
    </div>
    <div class="row mt-4">
      <BackgroundImages
        :temp-img="tempImg"
        @set-temp-img="(file: IFile) => setTempImg(file)"
      />
    </div>
    <div class="row mt-4">
      <FileUploader />
    </div>
    <div class="row mt-4">
      <div class="col">
        <p>Color:</p>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <input
          v-model="color"
          type="color"
          @change="onColorSelected"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IFile } from '@/models'
import { fileStore, userStore } from '@/stores'
import { storeToRefs } from 'pinia'

const emit = defineEmits<{
  setTempImg: [item: IFile | undefined]
}>()

const userstore = userStore()
const filestore = fileStore()

const { userData } = storeToRefs(userstore)
const { userFiles } = storeToRefs(filestore)

const color = ref<string>('')
const tempImg = ref<IFile | undefined>()

onMounted(() => {
  color.value = userData.value?.settings.backgroundColour ?? ''

  tempImg.value =
    userData.value?.settings.backgroundImage != undefined
      ? userFiles.value.find((file) => file.name === userData.value?.settings.backgroundImage)
      : undefined
})

const onColorSelected = (event: Event): void => {
  event.preventDefault()
  if (userData.value == undefined) {
    return
  }

  const tempData = { ...userData.value }

  tempData.settings.backgroundColour = color.value
  userstore.setUserData(tempData)
}

const setTempImg = (img: IFile | undefined): void => {
  tempImg.value = undefined

  setTimeout(() => {
    tempImg.value = img
    emit('setTempImg', img)
  }, 100)
}
</script>
