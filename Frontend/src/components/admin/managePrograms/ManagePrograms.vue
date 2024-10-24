<template lang="pug">
.manage-programs
  WindowFrame(:program="program" :isMoveable="true")
    .wrapper(class="flex flex-col m-2")
      ButtonComponent.mb-4(@clicked="changeShowManageProgram(true)" text="Add new program" size="full") 
      div(
        class="hover hover:bg-gray-200 flex bg-shadow p-1 justify-between rounded cursor-pointer mt-1" 
        v-for="program in allPrograms" 
        :key="program._id"
      ) 
        div(class="flex items-center")
          IconComponent.mx-2(name="fa-pencil" color="yellow" size="25" @click="setUpdateState(true, program); changeShowManageProgram(true)")
          p.mx-2 {{ `${program.sortOrder}: ${program.name }`}}
        IconComponent(name="bi-trash-fill" color="red" size="25" @click="deleteProgram(program)")
  
  WindowFrame(
    :program="{name: 'ManageProgram', displayName: 'Manage Program', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
     v-if="showManageProgram"
  )
    .add-program(class="flex flex-col p-4")
      InputComponent(v-model="programInfo.name" label="Name" placeholder="name")
      InputComponent(v-model="programInfo.displayName" label="Display name" placeholder="displayName")
      InputComponent(v-model="programInfo.image" label="image" placeholder="image")
      InputComponent(v-model="programInfo.color" label="color" placeholder="color")
      InputComponent(v-model="programInfo.sortOrder" label="sort order" type="number")
      InputComponent(v-model="programInfo.type" label="type" placeholder="type")
      div(class="flex mt-3 justify-center")
        ButtonComponent(@clicked="changeShowManageProgram(false)" text="Cancel")
        template(v-if="updateState === true")
          ButtonComponent(@clicked="updateProgram()" text="Update")
        template(v-else)
          ButtonComponent(@clicked="addProgram()" text="Add Program")
  Validating(
    v-if="showValidation === true"
    :text="'Delete program: ' + selectedProgram.displayName"
    @ok="ok()"
    @cancel="cancel()"
  )
</template>

<script setup lang="ts">
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'

const { program } = defineProps<{
  program: Object
}>()

const programsstore = programsStore()
const allPrograms = computed(() => programsstore.allPrograms)
const showManageProgram = ref(false)
const updateState = ref(false)
let selectedProgram = ref<IProgram | undefined>(undefined)
const programInfo = ref<IProgram>({
  _id: '',
  name: '',
  displayName: '',
  image: '',
  color: '',
  sortOrder: 0,
  type: '',
  isActive: false,
  left: 0,
  top: 0,
})
let showValidation = ref(false)

const addProgram = () => {
  if (
    programInfo.value.name !== '' &&
    programInfo.value.image !== '' &&
    programInfo.value.displayName !== ''
  ) {
    const newProgram: IProgram = {
      ...programInfo.value,
    }

    programsstore.createProgram(newProgram)
    resetInputs()
  }
}

const deleteProgram = (program: IProgram) => {
  selectedProgram.value = program
  showValidation.value = true
}

const updateProgram = () => {
  programsstore.updateProgram(programInfo.value as IProgram)
}

const resetInputs = () => {
  programInfo.value = {
    _id: '',
    name: '',
    displayName: '',
    color: '',
    image: '',
    sortOrder: 0,
    type: '',
    isActive: false,
    left: 0,
    top: 0,
  }
  selectedProgram.value = undefined
}

const ok = () => {
  if (selectedProgram.value === undefined) return
  else programsstore.deleteProgram(selectedProgram.value)
}

const cancel = () => {
  showValidation.value = false
  resetInputs()
}

const setUpdateState = (state: boolean, program: IProgram) => {
  updateState.value = state

  if (state === true) {
    selectedProgram.value = program
    programInfo.value = program
  } else {
    resetInputs()
  }
}

const changeShowManageProgram = (bool: boolean) => {
  showManageProgram.value = bool

  if (bool === false) setUpdateState(false, {} as IProgram)
}
</script>
