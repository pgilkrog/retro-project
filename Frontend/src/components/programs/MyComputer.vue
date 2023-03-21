<template lang="pug">
WindowFrame(:program="program" :isMoveable="true")
  .d-flex.flex-column.b-down
    .row.gx-0
      DesktopItem(
        :program="{DisplayName: '3½ Floppy (A:)', Image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: '(C:)', Image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: 'New (D:)', Image: 'bi-joystick'}"
      ).text-black
    .row.gx-0
      DesktopItem(
        :program="{DisplayName: 'Control Panel', Image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: 'Printers', Image: 'bi-joystick'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: 'Dial-Up Networking', Image: 'bi-joystick'}"
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