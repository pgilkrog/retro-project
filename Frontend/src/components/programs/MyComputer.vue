<template>
  <WindowFrame 
    :program="program" 
    :is-moveable="true" 
    variant="success"
  >
    <div class="grid grid-cols-2 p-4 text-black">
      <DesktopItem 
        v-for="(item, key) in array"
        :key
        :name="item.image"
        :display-name="item.displayName"
        class="!text-black"
      />
    </div>
  </WindowFrame>
</template>

<script setup lang="ts">
import type { IProgram } from '@/models'

const { program } = defineProps<{
  program: IProgram
}>()

const array = [
  { displayName: '3½ Floppy (A:)', image: 'bi-joystick' },
  { displayName: '(C:)', image: 'bi-joystick' },
  { displayName: 'New (D:)', image: 'bi-joystick' },
  { displayName: 'Control Panel', image: 'bi-joystick' },
  { displayName: 'Printers', image: 'bi-joystick' },  
  { displayName: 'Dial-Up Networking', image: 'bi-joystick' },
]

</script>