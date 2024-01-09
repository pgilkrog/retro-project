<template lang="pug">
button(
  @click="buttonClicked()"
  :type
  :disabled
  :class="[active ? 'bg-shadow-inner btn-active' : ' bg-shadow', 'bg-gray-300 border rounded flex content-center items-center px-4 py-2', 'bg-'+color+'-300']"
  v-bind="$attrs"
)
  template(v-if="!isLoading")
    IconComponent(
      v-if="icon" 
      :name="icon" 
      size="16" 
      :class="text !== undefined ? 'me-2' : ''"
    )
    p(v-if="text") {{ text }}
  template(v-else)
    div.spinner-border.spinner-border-sm.m-1(role="status")
      span(class="visually-hidden") Loading... 
</template>

<script setup lang="ts">
const { 
  text, 
  icon, 
  size = 'default', 
  active = false, 
  type = 'button', 
  disabled = false, 
  color, 
  variant, 
  isLoading = false 
} = defineProps({
  text: String,
  icon: String,
  size: String,
  active: Boolean,
  type: String,
  disabled: Boolean,
  color: String,
  variant: String,
  isLoading: Boolean
})

const emit = defineEmits([
  'clicked'
])

const buttonClicked = () => {
  emit('clicked')
}
</script>