<template>
  <h2 class="mb-4"> 
    {{ title }} 
  </h2>
  <div 
    v-if="programList" 
    class="programs-list divide-y-2 divide-gray-400"
  >
    <ProgramListItem  
      v-for="program in programList.filter((program: IProgram) => program.name !== 'AddOrRemovePrograms')"
      :key="program._id"
      v-bind="program"
      :class="(program._id === selectedProgramId) ? 'bg-blue-600 text-white' : ''"
      @click="changeSelectedProgram(program)" 
    />
  </div>
</template>

<script setup lang="ts">
import type { IProgram } from '@/models/index'

const { programList, title, selectedProgramId } = defineProps<{
  programList: IProgram[]
  title: string
  selectedProgramId: string
}>()

const emit = defineEmits<{
  'changeSelectedProgram': [program: IProgram]
}>()

const changeSelectedProgram = (program: IProgram) => {
  emit('changeSelectedProgram', { ...program })
}
</script>
