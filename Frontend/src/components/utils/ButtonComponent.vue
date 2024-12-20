<template>
  <button
    v-bind="$attrs"
    @click="emit('clicked')"
    type="button"
    :disabled
    :class="[
      'bg-gray-300 border rounded flex content-center justify-center items-center px-4 py-2',
      active ? 'bg-shadow-inner btn-active' : ' bg-shadow',
      'bg-' + color + '-300',
      disabled === true && 'bg-gray-200 cursor-not-allowed text-gray-500',
    ]"
  >
    <template v-if="!isLoading">
      <IconComponent
        v-if="icon"
        :name="icon"
        size="16"
        :class="{ 'me-2': text !== '' }"
      />
      <p
        v-if="text"
        :class="[size]"
      >
        {{ text }}
      </p>
    </template>
    <template v-else>
      <div
        class="spinner-border spinner-border-sm m-1"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </template>
  </button>
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
  isLoading = false,
} = defineProps<IButtonComponent>()

const emit = defineEmits<{
  clicked: []
}>()
</script>
