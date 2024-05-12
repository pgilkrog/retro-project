<template lang="pug">
.desktop-item(
  @click="itemPressed()" 
  class="flex flex-col items-center text-white w-64 m-1 text-center cursor-pointer"
  v-bind="$attrs"
)
  IconComponent(
    :variant="program.color" 
    :name="program.image" 
    size="34"
  )
  p(class="mt-2 line-clamp-2") {{ program.displayName ?? program.name }}
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IProgram } from '@/models/index'

const { itemColor = 'success', program } = defineProps({
  program: Object as PropType<IProgram>,
  itemColor: String
})

const emit = defineEmits([
  'generateComponent'
])

const itemPressed = () => {
  emit('generateComponent')
}

</script>