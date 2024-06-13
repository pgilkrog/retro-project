<template lang="pug">
button(
  v-bind="$attrs"
  @click="emit('clicked')"
  :type
  :disabled
  :class="['bg-gray-300 border rounded flex content-center justify-center items-center px-4 py-2', active ? 'bg-shadow-inner btn-active' : ' bg-shadow',  'bg-'+color+'-300', disabled === true ? 'bg-gray-200 cursor-not-allowed text-gray-500' : '']"
)
  template(v-if="!isLoading")
    IconComponent(
      v-if="icon" 
      :name="icon" 
      size="16" 
      :class="text !== undefined ? 'me-2' : ''"
    )
    p(v-if="text" :class="[size]") {{ text }}
  template(v-else)
    div.spinner-border.spinner-border-sm.m-1(role="status")
      span(class="visually-hidden") Loading... 
</template>

<script setup lang="ts">
const { 
  text, 
  icon, 
  size = '', 
  active = false, 
  disabled = false, 
  color, 
  type = 'button',
  isLoading = false 
} = defineProps({
  text: String,
  icon: String,
  size: String,
  active: Boolean,
  disabled: Boolean,
  color: String,
  isLoading: Boolean,
  type: String
})

const emit = defineEmits([
  'clicked'
])
</script>