<template lang="pug">
.menu-container.d-flex.mx-2.my-1(v-if="showMenu")
  .me-2 File
  .mx-2 Edit 
  .mx-2 View
  .ms-2 Help
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'windowframeMenu',
  props: {
    showMenu: Boolean
  },
  setup() {
    return {
      
    }
  }
})
</script>

<style lang="sass" scoped>
</style>