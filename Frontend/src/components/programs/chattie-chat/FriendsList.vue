<template>
  <div class="friendslist flex flex-col">
    <h4>{{ titel }}</h4>
    <span
      v-for="user in userList"
      :key="user._id"
    >
      <div
        v-if="user.email !== userstore.userData?.email"
        class="item p-2 m-1 flex items-center"
        @click="() => activateRoom(user.email)"
      >
        <IconComponent
          name="fa-user"
          size="20"
          :color="isOnline === true ? 'green' : 'red'"
        />
        <div
          class="ms-4"
          :class="isOnline === true ? 'text-green-500' : 'text-red-500'"
        >
          {{ user.email }}
        </div>
      </div>
    </span>
  </div>
</template>
<script setup lang="ts">
import type { IUser } from '@/models'
import { useChatStore, userStore } from '@/stores'

defineProps<{
  titel: string
  userList: IUser[]
  isOnline: boolean
}>()

const chatStore = useChatStore()
const userstore = userStore()

const activateRoom = (user: string) => {
  if (userstore.userData != undefined) {
    chatStore.joinRoom([user, userstore.userData.email])
  }
}
</script>
