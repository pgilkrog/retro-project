<template lang="pug">
WindowFrame(:program="program")
  .bg-white.light-border
    .row
      DesktopItem(
        :program="{DisplayName: '3½ Floppy (A:)', Image: 'https://win98icons.alexmeub.com/icons/png/floppy_drive_3_5_cool-0.png'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: '(C:)', Image: 'https://win98icons.alexmeub.com/icons/png/hard_disk_drive-2.png'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: 'New (D:)', Image: 'https://win98icons.alexmeub.com/icons/png/cd_drive_purple-0.png'}"
      ).text-black
    .row
      DesktopItem(
        :program="{DisplayName: 'Control Panel', Image: 'https://win98icons.alexmeub.com/icons/png/directory_control_panel-3.png'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: 'Printers', Image: 'https://win98icons.alexmeub.com/icons/png/directory_business_calendar-4.png'}"
      ).text-black
      DesktopItem(
        :program="{DisplayName: 'Dial-Up Networking', Image: 'https://win98icons.alexmeub.com/icons/png/directory_dial_up_networking-3.png'}"
      ).text-black            
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'
import DesktopItem from '../DesktopItem.vue'
import { IProgram } from '@/models/IProgram'

export default {
  components: {
    WindowFrame,
    DesktopItem
  },
  props: {
    program: Object
  },
  methods: {
  }
}
</script>