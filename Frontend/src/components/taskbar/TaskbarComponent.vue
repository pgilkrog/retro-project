<template>
  <div class="taskbar-component bg-gray-300 w-full h-auto fixed bottom-0 left-0 z-50">
    <div class="bg-black h-[2px] w-full" />
    <div class="bg-white h-[2px] w-full" />
    <div class="w-full p-1 flex justify-between">
      <div class="flex py-1 ms-1">
        <ButtonComponent
          text="Start"
          icon="fa-paw"
          @clicked="emit('changeShowMenu')"
          :active="showMenu"
          variant="primary"
          class="!py-3"
        />
        <div class="programs-container flex ml-2">
          <ButtonComponent
            v-for="item in activePrograms"
            :key="item._id"
            :text="item.displayName"
            :icon="item.image"
            @clicked="programsstore.setProgramActiveState(item)"
            :active="item.isActive"
          />
        </div>
      </div>
      <div class="flex items-center">
        <ButtonComponent
          v-if="userstore.userData?.type === 'admin'"
          text="admin"
          @clicked="router.push('/admin')"
          variant="danger"
        />
        <div
          class="px-3 ms-1 flex items-center p-2 rounded border-t-black border-s-black border border-b-white border-e-white"
        >
          <IconComponent
            name="fa-user"
            color="green"
            size="14"
          />
          <ClockComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/userStore'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import router from '@/router'

const emit = defineEmits<{
  changeShowMenu: []
}>()

const { showMenu } = defineProps<{
  showMenu: boolean
}>()

const programsstore = programsStore()
const userstore = userStore()

const activePrograms = ref<IProgram[]>(programsstore.activePrograms)
</script>
