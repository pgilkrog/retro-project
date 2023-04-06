<template lang="pug">
.programs-list
  h2.mb-4 {{ title }}
  .program-item.row.align-items-center.px-4.pointer.mx-0(
    v-for="(program, index) in programList" 
    :key="index" 
    @click="changeSelectedProgram(program)"
    :class="selectedProgramId !== '' && program.id === selectedProgramId ? 'active-program' : ''"
  )
    .col-1
      IconComponent.me-3(:variant="program.color === 'light' ? 'dark' : program.color" :name="program.image") 
    .col  
      p {{ program.displayName }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { IProgram } from '@/models/index'

export default defineComponent({
  name: 'programs-list',
  props: {
    programList: Array,
    title: String,
    selectedProgramId: String
  },
  setup(props, { emit }) {
    const changeSelectedProgram = (program: IProgram) => {
      emit('changeSelectedProgram', {...program})
    }

    return {
      changeSelectedProgram
    }
  }
})
</script>

<style lang="sass" scoped>
.active-program 
  background-color: darkblue
  color: white
  .icon
    color: white !important
.program-item:hover
  background: lightgray

.program-item + .program-item
  border-top: 1px solid lightgray
</style>