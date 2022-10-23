<template lang="pug">
.menu-item.py-2.px-4.w-100.d-flex.align-items-center(v-on:click="openProgram()")
  img(:src="img").me-3
  |  {{title}}
  span(v-if="hasChildren == true") >
</template>

<script lang="ts">

export default {
  props: {
    img: String,
    title: String,
    hasChildren: Boolean,
    componentName: String
  },
  methods: {
    openProgram() {
      console.log("HEjsa")
    }
  }
}
</script>