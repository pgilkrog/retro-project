<template lang="pug">
.desktop-item.d-flex.flex-column.align-items-center.pointer.text-light(
  @click="itemPressed()" 
  :class="itemColor ? 'text-' + itemColor : 'text-success'"
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

const props = defineProps({
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

<style lang="sass" scoped>
.desktop-item
  position: relative
  width: 120px
  text-align: center
  font-weight: 500
  max-height: 100px

.desktop-item + .desktop-item
  margin-top: 20px
</style>