<template>
  <div class="tabscomponent flex">
    <div
      v-for="(item, key) in list"
      :key
      class="nav-item"
      @click="emit('tabClick', key)"
      :class="[
        'py-2 px-4 cursor-pointer',
        activeTab === key ? 'border border-black border-b-0 ' : 'border-b border-black',
        'px-4 py-2 ',
      ]"
    >
      {{ item }}
    </div>
    <div class="flex flex-grow border-b border-black" />
  </div>
</template>
<script setup lang="ts">
const { list, activeTab = 0 } = defineProps<{
  list: []
  activeTab: number
}>()

const emit = defineEmits<{
  tabClick: [value: number]
}>()
</script>
