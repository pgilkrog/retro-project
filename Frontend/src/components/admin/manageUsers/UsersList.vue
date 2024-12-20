<template>
  <div
    class="d-flex bg-shadow py-1 px-4 justify-between items-center rounded-md cursor-pointer"
    v-for="item in allUsers"
    :key="item._id"
    @click="emit('setSelectedUser', item)"
  >
    {{ item.email }}
  </div>
</template>

<script setup lang="ts">
import type { IUser } from '@/models'
import { userStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userstore = userStore()
const { allUsers } = storeToRefs(userstore)

const emit = defineEmits<{
  setSelectedUser: [user: IUser]
}>()

onMounted(async () => {
  await userstore.getAllUsers()
})
</script>
