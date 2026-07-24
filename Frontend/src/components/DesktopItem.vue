<template>
  <div
    class="desktop-item flex flex-col items-center text-white m-1 text-center cursor-pointer"
    @click="() => emit('itemClicked')"
  >
    <ImageComponent
      :id="image"
      class="h-12 w-12"
      :source="appStore.getIcon(image)"
    />
    <p
      class="mt-2 line-clamp-2 px-1 py-0.5"
      :style="{ 'background-color': backgroundColor }"
    >
      {{ displayName }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

const { image = 'fa-house', backgroundColor = '#047857' } = defineProps<{
  color?: string
  image?: string
  displayName: string
  backgroundColor?: string
}>()

const emit = defineEmits<{
  itemClicked: []
}>()


const appStore = useAppStore()
</script>
