<template>
  <div
    v-if="showMenu === true"
    class="menu-container flex mx-2 my-1 space-x-6"
  >
    <p>File</p>
    <p>Edit</p>
    <p>View</p>
    <p>Help</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showMenu: boolean
}>()
</script>
