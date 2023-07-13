<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .d-flex.flex-column
    p(v-for="(item, index) in message") {{ item }}
  .d-flex
    input(type="text" v-model="messageText").me-4
    button.btn(@click="sendMessage()") Send
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits([
  'sendMessage'
])

const program = ref({
  name: 'ChatWindow', 
  displayName: 'Chat window', 
  color: 'success', 
  image: 'bi-wechat', 
  isActive: true
})

const messageText = ref<string>("")
const messages = ref<string[]>([])

const sendMessage = () => {
  emit('sendMessage', messageText.value)
  messages.value.push(messageText.value)
  messageText.value = ""
}

</script>

<style lang="sass" scoped>

</style>