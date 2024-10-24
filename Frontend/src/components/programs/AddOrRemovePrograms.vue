<template lang="pug">
WindowFrame(
  :program="program" 
  :isMoveable="true" 
  :showMenu="false" 
  :variant="program.color" 
  :isNotProgram="false"
)
  div(class="flex p-2")
    div(class="flex flex-col pe-3 gap-y-2")
      ButtonComponent(
        v-for="(button, key) in menuButtons"
        :key
        @clicked="button.clicked" 
        v-bind="button"
        :active="state === button.active"
      )
    .program-list(class="bg-gray-300 p-4 bg-shadow-inner")
      ProgramsList(
        v-if="state === 'removePrograms'"
        title="Installed programs"
        :programList="installedPrograms"
        :selectedProgramId="selectedProgramId"
        @changeSelectedProgram="changeSelectedProgram($event)"
      )
      ProgramsList(
        v-if="state === 'addPrograms'"
        title="Not installed programs"
        :programList="notInstalledPrograms"
        :selectedProgramId="selectedProgramId"
        @changeSelectedProgram="changeSelectedProgram($event)"
      )
  .row.p-2
    .flex.justify-end
      ButtonComponent(
        v-if="state === 'addPrograms'" 
        @clicked="installProgram()"
        :disabled="selectedProgramId === ''" 
        text="Install"
      )
      ButtonComponent(
        v-else 
        @clicked="removeProgram()"
        text="Remove"
        :disabled="selectedProgramId === ''"
      )
Loading(v-if="isInstalling === true" @closeLoading="closeLoading()")
</template>

<script setup lang="ts">
import { programsStore } from '@/stores/programsStore'
import { userStore } from '@/stores/userStore'
import type { IProgram } from '@/models/index'

const { program } = defineProps<{
  program: IProgram
}>()

const programsstore = programsStore()
const userstore = userStore()
const state = ref('removePrograms')
const isInstalling = ref(false)

let selectedProgram: IProgram | undefined
let selectedProgramId = ref('')

const allPrograms = computed(() => programsstore.allPrograms)
const notInstalledPrograms = computed(() => programsstore.notInstalledPrograms)
const installedPrograms = computed(() =>
  programsstore.installedPrograms.map((IPro) => IPro.program)
)

const menuButtons = [
  {
    clicked: () => changeState('removePrograms'),
    text: 'Remove Program',
    icon: 'fa-computer',
    active: 'removePrograms',
  },
  {
    clicked: () => changeState('addPrograms'),
    text: 'Add Program',
    icon: 'fa-folder-plus',
    active: 'addPrograms',
  },
]

onMounted(() => {
  console.log('GOT MOUNTED')
})

const installProgram = () => {
  if (selectedProgram === undefined) return

  isInstalling.value = true
  let user = userstore.userData

  if (user === undefined) return

  // user.installedPrograms.push(selectedProgram._id)
  // userstore.updateUser(user)
  programsstore.createInstalledProgram(selectedProgram._id)
}

const removeProgram = () => {
  if (selectedProgram === undefined) return

  isInstalling.value = true
  // let user = userstore.userData
  // if (user === undefined) return
  // user.installedPrograms = user.installedPrograms.filter(p => p !== selectedProgram?._id)
  // userstore.updateUser(user)

  programsstore.deleteInstalledProgram(
    programsstore.installedPrograms.find(
      (program) => program?.program?._id === selectedProgram?._id
    )?._id ?? ''
  )
}

const updateUser = () => {
  let tempUser = userstore.userData
  if (tempUser === undefined) return
  userstore.updateUser(tempUser)
}

const changeState = (newState: string) => {
  state.value = newState
  selectedProgram = undefined
  selectedProgramId.value = ''
}

const changeSelectedProgram = (program: IProgram) => {
  if (program === undefined) return
  selectedProgram = program
  selectedProgramId.value = program._id
}

const closeLoading = () => {
  isInstalling.value = false
}
</script>
