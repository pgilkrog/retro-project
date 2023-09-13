<template lang="pug">
.add-or-remove-programs
  WindowFrame(
    :program="program" 
    :isMoveable="true" 
    :showMenu="false" 
    :variant="program.color" 
    :isNotProgram="false"
  )
    .d-flex.p-2
      .d-flex.flex-column.pe-3
        Btn(
          @clicked="changeState('removePrograms')" 
          text="Remove Program" 
          icon="fa-computer" 
          size="full"
          :active="state === 'removePrograms'"
        )
        Btn(
          @clicked="changeState('addPrograms')"
          text="Add Program" 
          icon="fa-folder-plus" 
          size="full"
          :active="state === 'addPrograms'"
        ).mt-2
      .program-list.bg-grey.p-4.bg-shadow-inner.d-flex.flex-column
        ProgramList(
          v-show="state === 'removePrograms'"
          title="Installed programs"
          :programList="installedPrograms"
          :selectedProgramId="selectedProgramId"
          v-on:changeSelectedProgram="changeSelectedProgram($event)"
        )
        ProgramList(
          v-show="state === 'addPrograms'"
          title="Not installed programs"
          :programList="notInstalledPrograms"
          :selectedProgramId="selectedProgramId"
          v-on:changeSelectedProgram="changeSelectedProgram($event)"
        )
    .row.p-2
      .d-flex.justify-content-end
        Btn(
          v-if="state === 'addPrograms'" 
          @clicked="installProgram()"
          :disabled="selectedProgramId === ''" 
          text="Install"
        )
        Btn(
          v-else 
          @clicked="removeProgram()"
          text="Remove"
          :disabled="selectedProgramId === ''"
        )
Loader(v-if="isInstalling === true" @closeLoading="closeLoading()")
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { programsStore } from '@/stores/programsStore'
import { userStore } from '@/stores/userStore'
import type { IProgram } from '@/models/index'

import ProgramList from '@/components/programs/add-remove-programs/ProgramsList.vue'
import Loader from '@/components/Loading.vue'

const { program } = defineProps({
  program: Object
})

const programsstore = programsStore()
const userstore = userStore()
const state = ref('removePrograms')
const isInstalling = ref(false)

let selectedProgram: IProgram | undefined
let selectedProgramId = ref("")

const allPrograms = computed(() => programsstore.allPrograms)
const notInstalledPrograms = computed(() => programsstore.notInstalledPrograms)
const installedPrograms = computed(() => programsstore.installedPrograms)

onMounted(() => {
  console.log("GOT MOUNTED")
})

const installProgram = () => {
  if (selectedProgram === undefined)
    return

  isInstalling.value = true
  let user = userstore.userData

  if (user === undefined) return

  user.installedPrograms.push(selectedProgram.id)

  userstore.updateUser(user)
}

const removeProgram = () => {
  if (selectedProgram === undefined)
    return

  isInstalling.value = true
  let user = userstore.userData
  if (user === undefined) return
  user.installedPrograms = user.installedPrograms.filter(p => p !== selectedProgram?.id)
  userstore.updateUser(user)
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
  selectedProgramId.value = program.id
}

const closeLoading = () => {
  isInstalling.value = false
}
</script>

<style lang="sass" scoped>
.program-list
  width: 700px
  height: 400px
  overflow: auto
.active-program 
  background-color: darkblue
  color: white
  .icon
    color: white !important
.program-item:hover
  background: lightgray
</style>