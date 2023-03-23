<template lang="pug">
.manage-programs
  WindowFrame(:program="program" :isMoveable="true")
    .add-program.d-flex.flex-column.p-4
      label.mt-4(for="name") Name:
      input.tb(
        type="text" 
        v-model="name" 
        id="name"
      )      
      label.mt-4(for="displayName") Display Name:
      input.tb(
        type="text" 
        v-model="displayName" 
        id="displayName"
      )
      label.mt-4(for="image") Image:
      input.tb(
        type="text" 
        v-model="image" 
        id="image"
      )
      label.mt-4(for="color") Color:
      input.tb(
        type="text" 
        v-model="color" 
        id="color"
      )
      button.btn.mt-3(@click="addProgram()" v-if="updateState === false") Add Program
      .d-flex.mt-3.justify-content-between(v-else)
        button.btn(@click="setUpdateState(false)") Cancel
        button.btn(@click="updateProgram()") Update

    .d-flex(v-for="(program, index) in allPrograms" :key="index") 
      IconComponent(name="bi-trash-fill" variant="danger" @click="deleteProgram(program)")
      IconComponent(name="fa-pencil" variant="warning" @click="setUpdateState(true, program)")
      p {{ program.name }}
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import WindowFrame from '@/components/WindowFrame.vue'
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'

export default defineComponent({
  name: 'managePrograms',
  components: {
    WindowFrame
  }, 
  props: {
    program: Object
  },
  setup() {
    const programsstore = programsStore()
    const allPrograms = computed(() => programsstore.getPrograms)
    const name = ref('')
    const displayName = ref('')
    const color = ref('')
    const image = ref('')
    const updateState = ref(false)
    let selectedProgram = {}

    const addProgram = () => {
      if (name.value !== '' && image.value !== '' && displayName.value !== '') {
        const program = {
          id: '',
          name: name.value,
          displayName: displayName.value,
          color: color.value,
          image: image.value
        } as IProgram

        console.log(program)
        programsstore.createProgram(program)
        programsstore.getProgramsFromDB()
        resetInputs()
      }
    }

    const deleteProgram = (program: IProgram) => {
      programsstore.deleteProgram(program)
      programsstore.getProgramsFromDB()
      resetInputs()
    }

    const updateProgram = () => {
      let temp = selectedProgram as IProgram
      temp.name = name.value
      temp.displayName = displayName.value
      temp.image = image.value
      temp.color = color.value
      programsstore.updateProgram(temp)
    }

    const resetInputs = () => {
      name.value = ''
      displayName.value = ''
      color.value = ''
      image.value = ''
      selectedProgram = {}
    }

    const setUpdateState = (state: boolean, program: IProgram) => {
      updateState.value = state

      if (state === true) {
        selectedProgram = program
        name.value = program.name
        displayName.value = program.displayName
        color.value = program.color
        image.value = program.image
      } else {
        resetInputs()
      }
    }

    return {
      name,
      displayName,
      image,
      color,
      allPrograms,
      updateState,
      addProgram,
      deleteProgram,
      updateProgram,
      resetInputs,
      setUpdateState
    }
  }
})
</script>

<style lang="sass" scoped>
</style>