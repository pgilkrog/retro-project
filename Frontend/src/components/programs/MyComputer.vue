<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    variant="success"
  >
    <div class="">
      <ButtonComponent
        @clicked="setTeleport('#box1')"
        text="Teleport to box1"
      />
      <ButtonComponent
        @clicked="setTeleport('#box2')"
        text="Teleport to box2"
      />
      <ButtonComponent
        @clicked="setTeleport('#app')"
        text="Teleport to app"
      />
      <ButtonComponent
        @clicked="setTeleport('body')"
        text="Teleport to body"
      />
      <div id="firstbox"></div>
      <div
        class="bg-red-200 h-[200px] w-full flex items-center justify-center"
        id="box1"
      ></div>
      <div
        class="bg-green-200 h-[200px] w-full flex items-center justify-center"
        id="box2"
      ></div>
    </div>
    <div v-if="ismounted === true">
      <Teleport :to="teleportTarget">
        <div class="p-2 bg-white border rounded shadow text-center w-fit z-50 absolute">
          ⏱ Timer: {{ seconds }}s
        </div>
      </Teleport>
    </div>
    <!-- <div class="grid grid-cols-2 p-4 text-black">
      <DesktopItem 
        v-for="(item, key) in array"
        :key
        :name="item.image"
        :display-name="item.displayName"
        class="!text-black"
      />
    </div> -->
  </WindowFrame>
</template>

<script setup lang="ts">
import type { IProgram } from '@/models'

const { program } = defineProps<{
  program: IProgram
}>()

const ismounted = ref<boolean>(false)

const teleportTarget = ref<string>('#firstbox')

// const array = [
//   { displayName: '3½ Floppy (A:)', image: 'bi-joystick' },
//   { displayName: '(C:)', image: 'bi-joystick' },
//   { displayName: 'New (D:)', image: 'bi-joystick' },
//   { displayName: 'Control Panel', image: 'bi-joystick' },
//   { displayName: 'Printers', image: 'bi-joystick' },
//   { displayName: 'Dial-Up Networking', image: 'bi-joystick' },
// ]

const seconds = ref(0)
let interval: number | undefined

onMounted(() => {
  interval = setInterval(() => {
    seconds.value++
  }, 1000)
  setTimeout(() => {
    ismounted.value = true
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

function setTeleport(target: string) {
  teleportTarget.value = target
}
</script>
