<template lang="pug">
.custom-menu(class="flex")
  .nav-item(
    v-for="(item, key) in list"
    :key
    @click="emit('tabClick', key)" 
    :class="['py-2 px-4 cursor-pointer', activeTab === key ? 'border border-black border-b-0 rounded-t' : 'border-b border-black', 'px-4 py-2 ']")
    | {{ item }}
  .tab-fill.flex.flex-grow.border-b.border-black
</template>
<script setup lang="ts">
const { 
  list, 
  activeTab = 0 
} = defineProps<{
  list: any[],
  activeTab: number
}>()
const emit = defineEmits<{
  (e: 'tabClick', value: number): void
}>()
</script>