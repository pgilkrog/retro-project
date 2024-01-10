<template lang="pug">
.desktop-item.flex.flex-col.items-center.text-white.w-22(
  @click="itemPressed()" 
  :class="'text-' + itemColor"
  class="fit-"
)
  IconComponent(
    :variant="program.color" 
    :name="program.image" 
    size="34"
  )
  .text-light() {{ program.displayName ?? program.name }}
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