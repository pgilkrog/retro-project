<template lang="pug">
.d-flex.align-items-center.m-1
  label.me-2(v-if="label") {{ label + ': ' }}
  input.bg-shadow-inner.p-1.px-2.w-100(
    :type
    :value="modelValue" 
    @input="$emit('update:modelValue', type === 'checkbox' ? $event.target.checked : $event.target.value)"
    v-bind="$attrs"
    :placeholder
  )
</template>
<script setup lang="ts">

const { 
  label,
  modelValue,
  type = 'text',
  placeholder
} = defineProps({
  'label': String,
  'modelValue': String,
  'type': String,
  'placeholder': String
})

</script>