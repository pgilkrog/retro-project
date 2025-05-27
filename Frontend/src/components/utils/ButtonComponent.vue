<template>
  <button
    type="button"
    :disabled
    :class="[
      'bg-gray-300 border  flex content-center justify-center items-center px-4 py-2',
      'bg-' + color + '-300',
      active ? 'bg-shadow-inner btn-active' : ' bg-shadow',
      { 'bg-gray-200 cursor-not-allowed text-gray-500': disabled === true },
    ]"
    @click="emit('clicked')"
  >
    <template v-if="isLoading == false">
      <IconComponent
        v-if="icon != undefined"
        :class="{ 'me-2': text !== '' }"
        :name="icon"
        size="16"
      />
      <p
        v-if="text !== ''"
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
