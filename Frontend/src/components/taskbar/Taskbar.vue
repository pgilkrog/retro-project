<template lang="pug">
div(class="bg-gray-300 w-full h-auto fixed bottom-0 left-0 z-50")
  .line.bg-black
  .line.bg-white
  div(class="w-full p-1 flex justify-between ")
    div(class="flex py-1 ms-1")
      ButtonComponent(
        text="Start" 
        icon="fa-paw" 
        v-on:clicked="emit('changeShowMenu')" 
        :active="showMenu" 
        variant="primary"
        class="!py-3"
      )
      .programs-container(class="flex ml-2")
        ButtonComponent(
          v-for="item in activePrograms" 
          :key="item.id" 
          :text="item.displayName" 
          :icon="item.image"
          @clicked="setActiveState(item)"
          :active="item.isActive"
        )
    div(class="flex items-center")
      ButtonComponent(
        v-if="userstore.userData?.type === 'admin'" 
        text="admin" 
        v-on:clicked="goToAdmin()" 
        variant="danger"
      )
      div(class="px-3 ms-1 flex items-center p-2 rounded border-t-black border-s-black border  border-b-white border-e-white")
        IconComponent.me-4(name="fa-user" color="green" size="14")
        Clock
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { userStore } from '@/stores/userStore'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import router from '@/router'

const emit = defineEmits<{
  (e: 'changeShowMenu'): void
}>()

const { showMenu } = defineProps<{
  showMenu: boolean 
}>()

const programsstore = programsStore()
const userstore = userStore()

const activePrograms = ref<IProgram[]>(programsstore.activePrograms)

const setActiveState = (program: IProgram) => {
  programsstore.setProgramActiveState(program)
}

const goToAdmin = () => {
  router.push('/admin')
}
</script>

<style lang="sass">
.line 
  height: 2px
  width: 100%
</style>