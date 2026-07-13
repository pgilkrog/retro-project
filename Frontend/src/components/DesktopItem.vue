<template>
  <div
    class="desktop-item flex flex-col items-center text-white m-1 text-center cursor-pointer"
    @click="() => emit('itemClicked')"
  >
    <ImageComponent
      :id="image"
      class="h-12 w-12"
      :source="icon"
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
const { image = 'fa-house', backgroundColor = '#047857' } = defineProps<{
  color?: string
  image?: string
  displayName: string
  backgroundColor?: string
}>()

const emit = defineEmits<{
  itemClicked: []
}>()

const icons = import.meta.glob('@/assets/icons/*', { eager: true, import: 'default' })

const icon = computed(() => {
  const found = icons[`/src/assets/icons/${image}.png`]

  return typeof found === 'string' ? found : (icons['/src/assets/icons/retropcicon.png'] as string)
})
</script>
