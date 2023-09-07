<template lang="pug">
.menu-container.d-flex.mx-2.my-1(v-if="showMenu")
  .me-2 File
  .mx-2 Edit 
  .mx-2 View
  .ms-2 Help
</template>

<script setup lang="ts">
const { showMenu } = defineProps({
  showMenu: Boolean
})
</script>

<style lang="sass" scoped>
</style>