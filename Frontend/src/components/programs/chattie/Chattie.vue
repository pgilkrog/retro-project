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
  ChatWindow(v-on:sendMessage="sendMessage($event)", :socket="socket")
</template>
<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import type { IProgram } from '../../../models/index'
import io from 'socket.io-client'
import { userStore } from '@/stores/userStore'
import ChatWindow from './ChatWindow.vue'
import { chatStore } from '@/stores/chatStore'

const props = defineProps({
  program: Object as () => IProgram
})

const chatstore = chatStore()
const socket = ref()

onMounted(() => {
  chatstore.init()
})

</script>
<style lang="sass">
</style>