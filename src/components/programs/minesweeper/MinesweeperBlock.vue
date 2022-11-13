<template lang="pug">
.minesweeper-block(v-if="Block !== undefined" :class="Block.isClicked === true ? 'light-border' : 'st-border'")
  template(v-if="Block.isClicked === true")
    template(v-if="Block.bombcount > 0 && Block.isBomb === false")
      | {{ Block.bombcount }}
    template(v-else-if="Block.isBomb === true")
      | B 
    template(v-else)
      | {{ Block.index }}
</template>

<script lang="ts">
export default  {
  props: {
    Block: Object || undefined
  },
  components: {

  },
  methods: {
  
  }
}
</script>