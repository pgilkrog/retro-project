<template lang="pug">
.d-flex.bg-shadow.py-1.px-4.justify-content-between.align-items-center.rounded.pointer(
  v-for="item in userstore.allUsers" 
  :key="item._id" 
  @click="emit('setSelectedUser', item)"
) {{ item.email }}
</template>

<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { computed } from 'vue'

const userstore = userStore()
const allUsers = computed(() => userstore.allUsers)

const emit = defineEmits<{
  (e: 'setSelectedUser', item: any): void
}>()

onMounted(async () => {
  await userstore.getAllUsers()
})
</script>