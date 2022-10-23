<template lang="pug">
.desktop-item.d-flex.flex-column.align-items-center.fit-content.m-4.pointer(v-on:click="itemPressed()")
  img(:src="img" height="50" width="50")
  |  {{ title }}
</template>

<script lang="ts">
export default {
  props: {
    img: String,
    title: String,
    url: String
  },
  methods: {
    itemPressed() {
      this.$emit('generateComponent')
    }
  }
}
</script>