<template lang="pug">
component(:is="defineAsyncComponent(() => import(/* @vite-ignore */`../../views/screensavers/${'TitleMove'}.vue`))")
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
onMounted(() => {

})
</script>