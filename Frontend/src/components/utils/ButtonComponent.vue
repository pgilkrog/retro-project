<template lang="pug">
button.btn.d-flex.align-content-center.align-items-center.bg-secondary.rounded.hover(
  @click="buttonClicked"
  :type="type"
  :disabled="disabled"
  :style="'background: ' + color"
  :class="`${buttonClasses} ${active ? ' bg-shadow-inner btn-active' : ' bg-shadow'}`"
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
  text = 'OK', 
  icon, 
  size = 'default', 
  active = false, 
  type = 'button', 
  disabled, 
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

const buttonClasses = ` ` +
  `${size === 'default' ? ' px-4 py-2' : ''}` +
  `${size === 'wide' ? ' btn-wide' : ''}` +
  `${size === 'full' ? ' w-100 justify-content-center' : ''}` +
  `${variant === 'secondary' ? ' bg-secondary' : ' bg-'+variant} !important`

const buttonClicked = () => {
  emit('clicked')
}
</script>

<style lang="sass" scoped>
button
  line-height: 1.3
  width: fit-content
  height: fit-content
  p
    padding-top: 3px

.btn-wide
  min-width: 200px

</style>