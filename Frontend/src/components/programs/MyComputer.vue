<template lang="pug">
WindowFrame(:program="program" :isMoveable="true" variant="success")
  .d-flex.flex-column.b-down
    .row.gx-0
      DesktopItem(
        :program="{displayName: '3½ Floppy (A:)', image: 'bi-joystick'}"
      )
      DesktopItem(
        :program="{displayName: '(C:)', image: 'bi-joystick'}"
      )
      DesktopItem(
        :program="{displayName: 'New (D:)', image: 'bi-joystick'}"
      )
    .row.gx-0
      DesktopItem(
        :program="{displayName: 'Control Panel', image: 'bi-joystick'}"
      )
      DesktopItem(
        :program="{displayName: 'Printers', image: 'bi-joystick'}"
      )
      DesktopItem(
        :program="{displayName: 'Dial-Up Networking', image: 'bi-joystick'}"
      )
</template>

<script setup lang="ts">
import WindowFrame from '@/components/windowframe/WindowFrame.vue'
import DesktopItem from '../DesktopItem.vue'

const { program } = defineProps({
  program: Object
})

</script>

<style lang="sass" scoped>
</style>