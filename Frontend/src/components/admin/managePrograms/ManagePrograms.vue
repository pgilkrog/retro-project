<template lang="pug">
.manage-programs
  WindowFrame(:program="program" :isMoveable="true")
    .wrapper(class="flex flex-col m-2")
      ButtonComponent.mb-4(@clicked="changeShowManageProgram(true)" text="Add new program" size="full") 
      div(class="hover flex bg-shadow p-1 justify-start rounded cursor-pointer mt-1" v-for="program in allPrograms" :key="program._id") 
        div(class="flex items-center")
          IconComponent.mx-2(name="fa-pencil" variant="yellow" size="25" @click="setUpdateState(true, program); changeShowManageProgram(true)")
          p.mx-2 {{ `${program.sortOrder}: ${program.name }`}}
        IconComponent(name="bi-trash-fill" variant="red" size="25" @click="deleteProgram(program)")
  
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
    :text="'Delete program: ' + programInfo.displayName"
    @ok="ok()"
    @cancel="cancel()"
  )
</template>

<script setup lang="ts">
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'

const { program } = defineProps({
  program: Object
})

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
      _id: '',
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
</script>

<style lang="sass" scoped>
</style>