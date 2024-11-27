<template>
  <component 
    v-if="currentScreensaver" 
    :is="currentScreensaver" 
  />
</template>
<script setup lang="ts">
import TitleMove from '@/views/screensavers/TitleMove.vue' 
import TitleRotate from '@/views/screensavers/TitleRotate.vue'

/* eslint-disable  @typescript-eslint/no-explicit-any */
const currentScreensaver = shallowRef<any>(TitleRotate)
</script>