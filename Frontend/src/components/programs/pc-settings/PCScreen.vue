<template>
  <div class="pc-screen">
    <div class="bg-shadow p-4 fit-content">
      <div class="bg-shadow-inner img-box">
        <ImageComponent
          v-if="tempImg !== undefined && tempImg.name"
          id="pcscreen"
          :source="getImageUrl(tempImg.name)"
          alt="image for showing how wallpaper looks like"
          class
        />
        <div
          v-else
          :style="[{ 'background-color': userData?.settings?.backgroundColour }]"
        />
      </div>
    </div>
    <div class="bg-shadow square-1" />
    <div class="bg-shadow square-2" />
    <div class="bg-shadow square-3" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userStore } from '../../../stores/userStore'
import type { IFile } from '../../../models/index'

const { tempImg } = defineProps<{
  tempImg?: IFile
}>()

const userstore = userStore()
const { userData } = storeToRefs(userstore)

const getImageUrl = (filename: string) => {
  return `${import.meta.env.VITE_BASE_URL}/uploads/${filename}`
}
</script>

<style scoped lang="sass">
.img-box
  width: 300px
  height: 200px
  .box
    height: 192px
    width: 292px
    margin-top: 2px
    margin-left: 2px
    image-rendering: pixelated

.square-1
  width: 150px
  height: 10px

.square-2
  width: 120px
  height: 20px

.square-3
  width: 250px
  height: 10px
</style>
