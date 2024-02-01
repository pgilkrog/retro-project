<template lang="pug">
.input(class="flex align-center m-1 flex-grow")
  label.me-2(v-if="label") {{ label + ': ' }}
  input(
    class="bg-shadow-inner p-1 px-2 w-full rounded"
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