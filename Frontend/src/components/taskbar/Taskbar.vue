<template lang="pug">
.taskbar-container.fixed-bottom.bg-secondary
  .line.bg-secondary
  .line.bg-white
  .w-100.p-1.d-flex.justify-content-between
    .d-flex.py-1.ms-1
      Btn(
        text="Start" 
        icon="fa-paw" 
        v-on:clicked="changeShowMenu()" 
        :active="showMenu" 
        variant="primary"
      )
      .programs-container.d-flex.ms-2
        Btn(
          v-for="(item, index) in activePrograms" 
          :key="index" 
          :text="item.displayName" 
          :icon="item.image"
          @clicked="setActiveState(item)"
          :active="item.isActive"
        )
    div.d-flex
      Btn(
        v-if="userstore.userData?.type === 'admin'" 
        text="admin" 
        v-on:clicked="goToAdmin()" 
        variant="danger"
      )
      .px-3.ms-1.d-flex.align-items-center.p-2.bg-shadow-inner.rounded
        IconComponent.me-4(name="fa-user" variant="success" size="14")
        Clock
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { userStore } from '@/stores/userStore'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import router from '@/router'
import Clock from './Clock.vue'

const emit = defineEmits([
  'changeShowMenu'
])

const { showMenu } = defineProps({
  showMenu: Boolean 
})

const programsstore = programsStore()
const userstore = userStore()

const activePrograms = computed(() => programsstore.activePrograms)

const changeShowMenu = () => {
  emit('changeShowMenu')      
}

const setActiveState = (program: IProgram) => {
  programsstore.setProgramActiveState(program)
}

const goToAdmin = () => {
  router.push('/admin')
}
</script>

<style lang="sass">
.taskbar-container
  z-index: 999 !important

.line 
  height: 2px
  width: 100%
</style>