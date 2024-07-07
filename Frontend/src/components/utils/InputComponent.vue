<template lang="pug">
.input(:class="['flex m-1', useTwoLines === true ? 'flex-col text-start' : 'align-center items-center']")
  label(v-if="label" class="me-4 w-44") {{ label + ': ' }}
  input(
    class="bg-shadow-inner p-1 px-2 w-full rounded flex-grow"
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
  placeholder = '',
  useTwoLines = false
} = defineProps<{
  label?: string,
  modelValue: string | number,
  type?: string,
  placeholder?: string,
  useTwoLines?: boolean
}>()

</script>