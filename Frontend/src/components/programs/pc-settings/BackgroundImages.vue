<template lang="pug">
.row
  .background-images-wrapper.d-flex
    .image-item.m-2
      img(
        height="100"
        width="100"
        src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
        :class="userData.settings?.userBackgroundImage === 'undefined' || userData.settings?.userBackgroundImage === '' ? 'border border-danger' : ''"
        @click="imageClicked(undefined)"
      )
    .image-item.m-2(v-for="(item, index) in images" :key="index")
      img(
        height="100"
        width="100"
        :src="getImageUrl(item.name)"
        @click="imageClicked(item)"
        :class="userData.settings?.userBackgroundImage === item.name ? 'border border-danger' : ''"
      ).pointer
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'background-images',
  setup() {
    return {
      
    }
  }
})
</script>

<style lang="sass" scoped>
</style>