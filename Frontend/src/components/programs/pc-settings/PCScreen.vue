<template lang="pug">
.bg-shadow.p-4.fit-content.rounded
  .bg-shadow-inner.img-box()
    img.box(
      v-if="tempImg !== undefined && tempImg.name"
      :src="getImageUrl(tempImg.name)"
    )
    .box(
      v-else
      :style="[{'background-color': userData.settings?.backgroundColour}]"
    )
.bg-shadow.square-1.rounded-bottom
.bg-shadow.square-2
.bg-shadow.square-3.rounded-top
</template>

<script setup lang="ts">
import type { Ref, PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { userStore } from '../../../stores/userStore'
import type { IFile, IUser } from '../../../models/index'

const { tempImg } = defineProps({
  tempImg: Object as PropType<IFile>
})

const userstore = userStore()
const userData = storeToRefs(userstore).userData as Ref<IUser | undefined>

const getImageUrl = (filename: string) => {
  return `http://localhost:4000/uploads/${filename}`;
}
</script>

<style lang="sass" scoped>
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