<template lang="pug">
.desktop-item.d-flex.flex-column.align-items-center.fit-content.pointer.m-1(v-on:click="itemPressed()" :class="itemColor ? 'text-' + itemColor : 'text-success'")
  i(:class="'bi ' + program.Image" style="font-size: 3rem")
  |  {{ program.DisplayName }}
</template>

<script lang="ts">
export default {
  props: {
    program: Object,
    itemColor: String
  },
  methods: {
    itemPressed() {
      this.$emit('generateComponent')
    }
  }
}
</script>