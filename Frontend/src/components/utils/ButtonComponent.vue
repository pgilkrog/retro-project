<template lang="pug">
button(
  v-bind="$attrs"
  @click="emit('clicked')"
  :type
  :disabled
  :class="['bg-gray-300 border rounded flex content-center justify-center items-center px-4 py-2', active ? 'bg-shadow-inner btn-active' : ' bg-shadow',  'bg-'+color+'-300', disabled === true && 'bg-gray-200 cursor-not-allowed text-gray-500']"
)
  template(v-if="!isLoading")
    IconComponent(
      v-if="icon" 
      :name="icon" 
      size="16" 
      :class="text !== '' ? 'me-2' : ''"
    )
    p(v-if="text" :class="[size]") {{ text }}
  template(v-else)
    div.spinner-border.spinner-border-sm.m-1(role="status")
      span(class="visually-hidden") Loading... 
</template>

<script setup lang="ts">
import type { IButtonComponent } from '@/models'

const {
  text = '',
  icon,
  size = '16',
  active = false,
  disabled = false,
  color = 'black',
  type = 'button',
  isLoading = false,
} = defineProps<IButtonComponent>()

const emit = defineEmits<{
  (e: 'clicked'): void
}>()
</script>
