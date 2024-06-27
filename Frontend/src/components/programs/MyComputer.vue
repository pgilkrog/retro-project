<template lang="pug">
WindowFrame(:program="program" :isMoveable="true" variant="success")
  div(class="grid grid-cols-2 p-4 text-black")
    DesktopItem(
      v-for="(item, key) in array"
      :name="item.image"
      :displayName="item.displayName"
      :key
      class="!text-black"
    )
</template>

<script setup lang="ts">

const { program } = defineProps<{
  program: Object
}>()

const array = [
  {displayName: '3½ Floppy (A:)', image: 'bi-joystick'},
  {displayName: '(C:)', image: 'bi-joystick'},
  {displayName: 'New (D:)', image: 'bi-joystick'},
  {displayName: 'Control Panel', image: 'bi-joystick'},
  {displayName: 'Printers', image: 'bi-joystick'},  
  {displayName: 'Dial-Up Networking', image: 'bi-joystick'},
]

</script>