<template lang="pug">
div(v-on:click="method({item: 'yes'})" class="flex items-center gap-x-2 cursor-pointer")
  IconComponent(:name="icon")
  | {{ name }}
</template>
<script setup lang="ts">
interface iListItem {
  name: string
  icon: string
  method: () => {}
}

const props = defineProps<{   
  name: string
  icon: string
  method: any
  }>()
</script>