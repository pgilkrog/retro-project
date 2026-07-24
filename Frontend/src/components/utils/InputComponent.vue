<template>
  <div
    class="inputcomponent flex m-1"
    :class="[useTwoLines === true ? 'flex-col text-start' : 'align-center items-center']"
  >
    <label v-if="label !== ''">{{ label }}</label>
    <input
      v-model="debouncedModel"
      class="bg-shadow-inner  p-1 px-2 w-full flex-grow"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>
<script setup lang="ts">
const {
  label = '',
  placeholder = '',
  useTwoLines = false,
  useDebounce = false,
  type = 'textbox',
} = defineProps<{
  label?: string
  placeholder?: string
  useTwoLines?: boolean
  useDebounce?: boolean
  type: string
}>()

const model = defineModel<string | number>()
const timer = ref<number>(0)

// Writable Computed
const debouncedModel = computed({
  get: () => model.value,
  set: (value) => {
    if (useDebounce === true) {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        model.value = value
      }, 500)
    } else {
      model.value = value
    }
  },
})
</script>