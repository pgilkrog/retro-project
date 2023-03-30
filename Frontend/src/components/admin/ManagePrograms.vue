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
      label(for="name") Name:
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
      label.mt-4(for="sortOrder") Sort order:
      input.tb(
        type="number"
        v-model="sortOrder"
        id="sortOrder"
      )
      
      .d-flex.mt-3.justify-content-between
        button.btn(@click="changeShowManageProgram(false)") Cancel
        template(v-if="updateState === true")
          button.btn(@click="updateProgram()") Update
        template(v-else)
          button.btn(@click="addProgram()" ) Add Program
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
    const sortOrder = ref(0)
    const showManageProgram = ref(false)
    const updateState = ref(false)
    let selectedProgram = {}

    const addProgram = () => {
      if (name.value !== '' && image.value !== '' && displayName.value !== '') {
        const program = {
          id: '',
          name: name.value,
          displayName: displayName.value,
          color: color.value,
          image: image.value,
          sortOrder: sortOrder.value
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
      temp.name = name.value
      temp.displayName = displayName.value
      temp.image = image.value
      temp.color = color.value
      temp.sortOrder = sortOrder.value
      programsstore.updateProgram(temp)
    }

    const resetInputs = () => {
      name.value = ''
      displayName.value = ''
      color.value = ''
      image.value = ''
      sortOrder.value = 0
      selectedProgram = {}
      changeShowManageProgram(false)
    }

    const setUpdateState = (state: boolean, program: IProgram) => {
      updateState.value = state

      if (state === true) {
        selectedProgram = program
        name.value = program.name
        displayName.value = program.displayName
        color.value = program.color
        image.value = program.image
        sortOrder.value = program.sortOrder
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
      displayName,
      image,
      color,
      sortOrder,
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