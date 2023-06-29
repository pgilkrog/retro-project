<template lang="pug">
.manage-programs
  WindowFrame(:program="program" :isMoveable="true")
    .d-flex.flex-column.m-2
      button.btn.mb-4(@click="changeShowManageProgram(true)") Add new program
      
      .hover.d-flex.bg-shadow.p-1.pe-4.justify-content-between.align-items-center.rounded.pointer.mt-1(v-for="(program, index) in allPrograms" :key="index") 
        .d-flex.align-items-center
          IconComponent.mx-2(name="fa-pencil" variant="warning" size="25" @click="setUpdateState(true, program); changeShowManageProgram(true)")
          p.mx-2 {{ `${program.sortOrder}: ${program.name }`}}
        IconComponent(name="bi-trash-fill" variant="danger" size="25" @click="deleteProgram(program)")
  
  WindowFrame(
    :program="{name: 'ManageProgram', displayName: 'Manage Program', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
     v-if="showManageProgram"
  )
    .add-program.d-flex.flex-column.p-4
      ProgramInputs(
        v-model:name="programInfo.name"
        v-model:displayName="programInfo.displayName"
        v-model:image="programInfo.image"
        v-model:color="programInfo.color"
        v-model:sortOrder="programInfo.sortOrder"
        v-model:type="programInfo.type"
      )
      .d-flex.mt-3.justify-content-between
        button.btn(@click="changeShowManageProgram(false)") Cancel
        template(v-if="updateState === true")
          button.btn(@click="updateProgram()") Update
        template(v-else)
          button.btn(@click="addProgram()") Add Program
  Validating(
    v-if="showValidation === true" 
    :text="'Delete program: ' + programInfo.displayName"
    @ok="ok()"
    @cancel="cancel()"
  )
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import ProgramInputs from './ProgramInputs.vue'
import Validating from '@/components/Validating.vue'

export default defineComponent({
  name: 'managePrograms',
  components: {
    ProgramInputs,
    Validating
  }, 
  props: {
    program: Object
  },
  setup() {
    const programsstore = programsStore()
    const allPrograms = computed(() => programsstore.allPrograms)
    const showManageProgram = ref(false)
    const updateState = ref(false)
    let selectedProgram = ref<IProgram | null>(null)
    const programInfo = reactive({
      name: '',
      displayName: '',
      image: '',
      color: '',
      sortOrder: 0,
      type: ''
    })
    let showValidation = ref(false)

    const addProgram = () => {
      if (
        programInfo.name !== '' && 
        programInfo.image !== '' && 
        programInfo.displayName !== ''
      ) {
        const program = {
          id: '',
          name: programInfo.name,
          displayName: programInfo.displayName,
          color: programInfo.color,
          image: programInfo.image,
          sortOrder: programInfo.sortOrder,
          type: programInfo.type
        } as IProgram

        programsstore.createProgram(program)
        resetInputs()
      }
    }

    const deleteProgram = (program: IProgram) => {
      selectedProgram.value = program
      programInfo.name = program.name
      programInfo.displayName = program.displayName
      programInfo.color = program.color
      programInfo.image = program.image
      programInfo.sortOrder = program.sortOrder
      programInfo.type = program.type
      showValidation.value = true
    }

    const updateProgram = () => {
      let temp = selectedProgram.value as IProgram
      temp.name = programInfo.name
      temp.displayName = programInfo.displayName
      temp.image = programInfo.image
      temp.color = programInfo.color
      temp.sortOrder = programInfo.sortOrder
      temp.type = programInfo.type
      programsstore.updateProgram(temp)
    }

    const resetInputs = () => {
      programInfo.name = ''
      programInfo.displayName = ''
      programInfo.color = ''
      programInfo.image = ''
      programInfo.sortOrder = 0
      programInfo.type = ''
      selectedProgram.value = null
    }

    const ok = () => {
      console.log("ok", selectedProgram.value)
    }

    const cancel = () => {
      showValidation.value = false
      resetInputs()
    }

    const setUpdateState = (state: boolean, program: IProgram) => {
      updateState.value = state

      if (state === true) {
        selectedProgram.value = program
        programInfo.name = program.name
        programInfo.displayName = program.displayName
        programInfo.color = program.color
        programInfo.image = program.image
        programInfo.sortOrder = program.sortOrder
        programInfo.type = program.type
      } else {
        resetInputs()
      }
    }

    const changeShowManageProgram = (bool: boolean) => {
      showManageProgram.value = bool

      if (bool === false)
        setUpdateState(false, {} as IProgram)
    }

    return {
      programInfo,
      allPrograms,
      updateState,
      showManageProgram,
      showValidation,
      addProgram,
      deleteProgram,
      updateProgram,
      resetInputs,
      setUpdateState,
      changeShowManageProgram,
      ok,
      cancel
    }
  }
})
</script>

<style lang="sass" scoped>
</style>