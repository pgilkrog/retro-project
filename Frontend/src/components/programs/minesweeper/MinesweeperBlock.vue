<template>
  <div
    class="minesweeper-block m-1 rounded text-light"
    v-if="block !== undefined"
    :class="block.isClicked === true ? 'bg-shadow-inner' : 'bg-shadow'"
  >
    <template v-if="block.isClicked === true">
      <template v-if="block.bombcount > 0 && block.isBomb === false">
        {{ block.bombcount }}
      </template>
      <template v-else-if="block.isBomb === true">B</template>
      <template v-else>
        {{ block.index }}
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
const { block } = defineProps<{
  block?: any
}>()
</script>
