<template lang="pug">
.minesweeper-block.m-1.rounded.text-light(
  v-if="Block !== undefined" 
  :class="Block.isClicked === true ? 'bg-shadow-inner' : 'bg-shadow'"
)
  template(v-if="Block.isClicked === true")
    template(v-if="Block.bombcount > 0 && Block.isBomb === false")
      | {{ Block.bombcount }}
    template(v-else-if="Block.isBomb === true")
      | B 
    template(v-else)
      | {{ Block.index }}
</template>

<script setup lang="ts">
const { Block } = defineProps<{
  Block: Object | undefined
}>()
</script>