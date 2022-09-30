<template lang="pug">
.menu-item.py-2.px-4.w-100.d-flex.align-items-center(v-on:click="openProgram()")
    img(:src="img").me-3
    |  {{title}}
    span(v-if="hasChildren == true") >
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
  props: {
    img: String,
    title: String,
    hasChildren: Boolean,
    componentName: String
  }
})
export default class MenuItem extends Vue {
    img: string | undefined
    title: string | undefined
    hasChildren: boolean | undefined
    componentName: string | undefined

    openProgram() {
      console.log("HEjsa")
    }
}
</script>
