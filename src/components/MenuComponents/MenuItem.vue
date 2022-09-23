<template lang="pug">
.menu-item.py-2.px-4.w-100.d-flex.align-items-center
    img(:src="img").me-3
    |  {{title}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
  props: {
    img: String,
    title: String
  }
})
export default class MenuItem extends Vue {
    img: string | undefined
    title: string | undefined
}
</script>
