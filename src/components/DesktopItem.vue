<template lang="pug">
.desktop-item.d-flex.flex-column.align-items-center.fit-content.m-4.pointer.text-light(v-on:click="itemPressed()")
  i(:class="'bi ' + program.Image" style="font-size: 3rem")
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