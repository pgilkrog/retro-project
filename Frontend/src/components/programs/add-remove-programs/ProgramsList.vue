<template lang="pug">
.programs-list(v-if="programList")
  h2.mb-4 {{ title }} 
  .program-item(
    :class="(program._id === selectedProgramId) ? 'bg-blue-600 text-white' : ''"
    v-for="program in programList.filter((program: IProgram) => program.name !== 'AddOrRemovePrograms')"
    :key="program._id"
    @click="changeSelectedProgram(program)"
  )
    ProgramListItem(
      :name="program.displayName"
      :color="program.color"
      :icon="program.image"
    )
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'
import type { PropType } from 'vue'

const {
  programList,
  title,
  selectedProgramId
 } = defineProps<{
  programList: IProgram[],
  title: string,
  selectedProgramId: string
 }>()

const emit = defineEmits<{
 (e: 'changeSelectedProgram', program: IProgram): void
}>()

const changeSelectedProgram = (program: IProgram) => {
  emit('changeSelectedProgram', {...program})
}
</script>

<style lang="sass" scoped>

.program-item + .program-item
  border-top: 1px solid gray
</style>