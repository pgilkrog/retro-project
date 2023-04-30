<template lang="pug">
WindowFrame(:program="program" :isMoveable="true" variant="success")
  .d-flex.flex-column.b-down
    .row.gx-0
      DesktopItem(
        :program="{displayName: '3½ Floppy (A:)', image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{displayName: '(C:)', image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{displayName: 'New (D:)', image: 'bi-joystick'}"
      ).text-black
    .row.gx-0
      DesktopItem(
        :program="{displayName: 'Control Panel', image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{displayName: 'Printers', image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{displayName: 'Dial-Up Networking', image: 'bi-joystick'}"
      ).text-black            
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'
import DesktopItem from '../DesktopItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    WindowFrame,
    DesktopItem
  },
  props: {
    program: Object
  }
})
</script>