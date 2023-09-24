<template lang="pug">
.programs-list
  h2.mb-4 {{ title }}
  .program-item.row.align-items-center.px-4.pointer.mx-0.py-2(
    v-for="program in programList" 
    :key="program._id" 
    @click="changeSelectedProgram(program)"
    :class="selectedProgramId !== '' && program.id === selectedProgramId ? 'active-program' : ''"
  )
    .col-1
      IconComponent.me-3(:variant="program.color === 'light' ? 'dark' : program.color" :name="program.image") 
    .col-7
      p {{ program.displayName }}
    .col-4.text-end {{ size() }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IProgram } from '@/models/index'

const { programList, title, selectedProgramId } = defineProps({
  programList: Array,
  title: String,
  selectedProgramId: String
})

const emit = defineEmits([
  'changeSelectedProgram'
])
 
const changeSelectedProgram = (program: IProgram) => {
  emit('changeSelectedProgram', {...program})
}

const size = () => {
  return `size: ${Math.round(Math.random() * 1000)}mb`
}
</script>

<style lang="sass" scoped>
.active-program 
  background-color: #106BDA
  color: white
  .icon
    color: white !important
.program-item:hover
  background: lightgray

.program-item + .program-item
  border-top: 1px solid lightgray
</style>