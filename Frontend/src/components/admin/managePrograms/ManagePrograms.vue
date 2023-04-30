<template lang="pug">
.manage-programs
  WindowFrame(:program="program" :isMoveable="true")
    .d-flex.flex-column.m-2
      button.btn.mb-4(@click="changeShowManageProgram(true)") Add new program
      .d-flex.bg-shadow.py-1.px-4.justify-content-between.align-items-center.rounded(v-for="(program, index) in allPrograms" :key="index") 
        .d-flex
          p {{ program.sortOrder + ': ' + program.name }}
          IconComponent.mx-2(name="fa-pencil" variant="warning" size="25" @click="setUpdateState(true, program); changeShowManageProgram(true)")
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
      )

      .d-flex.mt-3.justify-content-between
        button.btn(@click="changeShowManageProgram(false)") Cancel
        template(v-if="updateState === true")
          button.btn(@click="updateProgram()") Update
        template(v-else)
          button.btn(@click="addProgram()" ) Add Program
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue'
import WindowFrame from '@/components/WindowFrame.vue'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import ProgramInputs from './ProgramInputs.vue'

export default defineComponent({
  name: 'managePrograms',
  components: {
    WindowFrame,
    ProgramInputs
  }, 
  props: {
    program: Object
  },
  setup() {
    const programsstore = programsStore()
    const allPrograms = computed(() => programsstore.getPrograms)
    const showManageProgram = ref(false)
    const updateState = ref(false)
    let selectedProgram = {}
    const programInfo = reactive({
      name: "",
      displayName: "",
      image: "",
      color: "",
      sortOrder: 0
    })

    const addProgram = () => {
      if (programInfo.name !== '' && programInfo.image !== '' && programInfo.displayName !== '') {
        const program = {
          id: '',
          name: programInfo.name,
          displayName: programInfo.displayName,
          color: programInfo.color,
          image: programInfo.image,
          sortOrder: programInfo.sortOrder
        } as IProgram

        programsstore.createProgram(program)
        resetInputs()
      }
    }

    const deleteProgram = (program: IProgram) => {
      programsstore.deleteProgram(program)
      resetInputs()
    }

    const updateProgram = () => {
      let temp = selectedProgram as IProgram
      debugger
      temp.name = programInfo.name
      temp.displayName = programInfo.displayName
      temp.image = programInfo.image
      temp.color = programInfo.color
      temp.sortOrder = programInfo.sortOrder
      programsstore.updateProgram(temp)
    }

    const resetInputs = () => {
      programInfo.name = ''
      programInfo.displayName = ''
      programInfo.color = ''
      programInfo.image = ''
      programInfo.sortOrder = 0
      selectedProgram = {}
      changeShowManageProgram(false)
    }

    const setUpdateState = (state: boolean, program: IProgram) => {
      updateState.value = state

      if (state === true) {
        selectedProgram = program
        programInfo.name = program.name
        programInfo.displayName = program.displayName
        programInfo.color = program.color
        programInfo.image = program.image
        programInfo.sortOrder = program.sortOrder
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
      name,
      programInfo,
      allPrograms,
      updateState,
      showManageProgram,
      addProgram,
      deleteProgram,
      updateProgram,
      resetInputs,
      setUpdateState,
      changeShowManageProgram
    }
  }
})
</script>

<style lang="sass" scoped>
</style>