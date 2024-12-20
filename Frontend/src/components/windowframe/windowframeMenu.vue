<template>
  <div
    class="menu-container flex mx-2 my-1 space-x-2"
    v-if="showMenu === true"
  >
    <p>File</p>
    <p>Edit</p>
    <p>View</p>
    <p>Help</p>
  </div>
</template>

<script setup lang="ts">
const { showMenu } = defineProps<{
  showMenu: boolean
}>()
</script>
