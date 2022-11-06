<template lang="pug">
.desktop-item.d-flex.flex-column.align-items-center.fit-content.m-4.pointer(v-on:click="itemPressed()")
  img(:src="program.Image" height="50" width="50")
  |  {{ program.DisplayName }}
</template>

<script lang="ts">
export default {
  props: {
    program: Object
  },
  methods: {
    itemPressed() {
      this.$emit('generateComponent')
    }
  }
}
</script>