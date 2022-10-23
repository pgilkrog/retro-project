<template lang="pug">
WindowFrame(title="My Computer" v-on:closeWindow="closeWindow")
  .bg-white.light-border
    .row
      DesktopItem(
        img="https://win98icons.alexmeub.com/icons/png/floppy_drive_3_5_cool-0.png"
        title="3½ Floppy (A:)"
      ).text-black
      DesktopItem(
        img="https://win98icons.alexmeub.com/icons/png/hard_disk_drive-2.png"
        title="(C:)"
      ).text-black
      DesktopItem(
        img="https://win98icons.alexmeub.com/icons/png/cd_drive_purple-0.png"
        title="New (D:)"
      ).text-black
    .row
      DesktopItem(
        img="https://win98icons.alexmeub.com/icons/png/directory_control_panel-3.png"
        title="Control Panel"
      ).text-black
      DesktopItem(
        img="https://win98icons.alexmeub.com/icons/png/directory_business_calendar-4.png"
        title="Printers"
      ).text-black
      DesktopItem(
        img="https://win98icons.alexmeub.com/icons/png/directory_dial_up_networking-3.png"
        title="Dial-Up Networking"
      ).text-black            
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue';
import DesktopItem from '../DesktopItem.vue';

export default {
  components: {
    WindowFrame,
    DesktopItem
  },
  methods: {
    closeWindow() {
      this.$emit('closeWindow', "MyComputer")
    }
  }
}
</script>