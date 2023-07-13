<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .top.d-flex.justify-content-between.bg-shadow.p-2.mb-1
    IconComponent(name="fa-user-plus" variant="success" size="40" rotate="0")
    IconComponent(name="fa-comment" variant="success" size="40" rotate="0")
    IconComponent(name="fa-phone" variant="success" size="40" rotate="0")
  .friends-list.d-flex.flex-column.bg-light.bg-shadow-inner.m-1
    .item.p-2 Steve 
    .item.p-2 Hannah
  ChatWindow(v-on:sendMessage="sendMessage($event)")
</template>
<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import type { IProgram } from '../../../models/index'
import io from 'socket.io-client'
import { userStore } from '@/stores/userStore'
import ChatWindow from './ChatWindow.vue'

const props = defineProps({
  program: Object as () => IProgram
})

const userstore = userStore()

const socket = ref()
const messages = ref<string[]>([])

onMounted(() => {
  socket.value = io('http://localhost:4000')
  socket.value.on('chatMessage', (message: string) => {
      messages.value.push(message);
    });
})

const sendMessage = (message: string) => {
  socket.value.emit('chatMessage', {
    username: userstore.userData?.email,
    text: message
  })
}

</script>
<style lang="sass">
</style>