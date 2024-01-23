<template lang="pug">
WindowFrame(
  :program="program"
  :isMoveable="true"
  :variant="program.color"
  :showMenu="false"
)
  .message-wrapper.d-flex.flex-column.bg-light.p-2
    template(v-for="(item, index) in activeChat.messages") 
      span(style="text-align: right;" v-if="item.sender !== userstore.userData.email") 
        p.text-primary {{ item.sender }}
        p(v-html="item.text")
      span(style="text-align: left;" v-else)
        p.text-success {{ item.sender }}
        p(v-html="item.text")
  .d-flex.bg-shadow.p-2
    BaseInput(v-model="messageText" @keydown.enter="sendMessage()")
    Btn(@clicked="sendMessage()" text="Send")
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "@/stores/userStore";
import { chatStore } from "@/stores/chatStore";
import type { PropType } from "vue";
import type { IChatMessage, IChatRoom } from "@/models";

const emit = defineEmits(["sendMessage"]);

const { activeChat } = defineProps({
  activeChat: Object as PropType<IChatRoom>,
});

const program = {
  name: "ChatWindow",
  displayName: "Chat window",
  color: "success",
  image: "bi-wechat",
  isActive: true,
};

const userstore = userStore();
const chatstore = chatStore();
const messageText = ref<string>("");

const sendMessage = () => {
  const idOfMessage =
    activeChat !== undefined && activeChat.messages !== undefined
      ? activeChat.messages.length
      : 0;
  const message: IChatMessage = {
    id: idOfMessage + 1,
    text: messageText.value,
    sender: userstore.userData?.email ?? "",
    room: activeChat!.participants.join("-"),
  };
  chatstore.sendMessage(message, activeChat);
  messageText.value = "";
};
</script>

<style lang="sass" scoped>
.message-wrapper
  height: 400px
  overflow-y: scroll
</style>
