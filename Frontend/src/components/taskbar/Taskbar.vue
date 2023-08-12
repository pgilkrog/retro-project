<template lang="pug">
.taskbar-container.fixed-bottom.bg-secondary
  .line.bg-secondary
  .line.bg-white
  .w-100.p-1.d-flex.justify-content-between
    .d-flex.py-1.ms-1
      button.rounded.btn.me-1.text-black(variant="dark" @click="changeShowMenu()" :class="props.showMenu ? 'bg-shadow-inner' : 'bg-shadow'")
        IconComponent(name="fa-paw" size="20").me-1
        |   Start
      .programs-container.d-flex
        .taskbar-item.bg-secondary.h-100.pe-4.ps-2.d-flex.align-items-center.rounded.text-black.pointer(
          v-for="(item, index) in activePrograms" 
          :key="index"
          :class="item.isActive ? 'bg-shadow-inner' : 'bg-shadow'"
          @click="setActiveState(item)"
        )
          IconComponent(:name="item.image" size="20").me-3
          | {{ item.displayName }}
    div.d-flex
      button.btn(@click="goToAdmin()") admin
      .px-3.ms-1.d-flex.align-items-center.p-2.bg-shadow-inner.rounded
        IconComponent.me-4(name="fa-user" variant="success" size="14")
        Clock
</template>

<script setup lang="ts">
import Clock from './Clock.vue'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import { defineComponent, computed } from 'vue'
import router from '@/router'
import { userStore } from '@/stores/userStore'

const emit = defineEmits([
  'changeShowMenu'
])

const props = defineProps({
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
</style>