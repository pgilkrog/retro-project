<template lang="pug">
component(v-if="currentScreensaver" :is="currentScreensaver")
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import TitleMove from '@/views/screensavers/TitleMove.vue'
import TitleRotate from '@/views/screensavers/TitleRotate.vue'

const currentScreensaver = shallowRef(TitleMove)

onMounted(() => {


})
</script>