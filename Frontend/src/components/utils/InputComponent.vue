<template>
  <div
    :class="[
      'flex m-1',
      useTwoLines === true ? 'flex-col text-start' : 'align-center items-center',
    ]"
  >
    <label>{{ label }}</label>
    <input
      class="bg-shadow-inner p-1 px-2 w-full flex-grow"
      type="textbox"
      v-model="debouncedModel"
      v-bind="$attrs"
      :placeholder
    />
  </div>
</template>
<script setup lang="ts">
const {
  label,
  placeholder = '',
  useTwoLines = false,
  useDebounce = false,
} = defineProps<{
  label?: string
  placeholder?: string
  useTwoLines?: boolean
  useDebounce?: boolean
}>()

const model = defineModel<string | number>()
const timer = ref<number>(0)

// Writable Computed
const debouncedModel = computed({
  get() {
    return model.value
  },
  set(value) {
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
