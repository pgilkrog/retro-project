<template>
  <WindowFrame
    :program="program"
    :is-moveable="true"
    :show-menu="false"
    :variant="program.color"
    :is-not-program="false"
  >
    <div class="flex p-2">
      <div class="flex flex-col pe-3 gap-y-2">
        <ButtonComponent
          v-for="(button, key) in menuButtons"
          :key="key"
          v-bind="button"
          :active="state === button.active"
          @clicked="() => button.clicked()"
        />
      </div>
      <div class="program-list bg-gray-300 p-4 bg-shadow-inner">
        <ProgramsList
          v-if="state === states.REMOVE_PROGRAM"
          title="Installed programs"
          :program-list="installedPrograms"
          :selected-program-id="selectedProgram?._id"
          @change-selected-program="(program: IProgram) => changeSelectedProgram(program)"
        />
        <ProgramsList
          v-else-if="state === states.ADD_PRROGAM"
          title="Not installed programs"
          :program-list="notInstalledPrograms"
          :selected-program-id="selectedProgram?._id"
          @change-selected-program="(program: IProgram) => changeSelectedProgram(program)"
        />
      </div>
    </div>
    <div class="row p-2">
      <div class="flex justify-end">
        <ButtonComponent
          v-if="state === states.ADD_PRROGAM"
          text="Install"
          :disabled="selectedProgram === undefined"
          @clicked="() => addOrRemoveProgram(false)"
        />
        <ButtonComponent
          v-else-if="state === states.REMOVE_PROGRAM"
          text="Remove"
          :disabled="selectedProgram === undefined"
          @clicked="() => addOrRemoveProgram(true)"
        />
      </div>
    </div>
    <LoadingComponent
      v-if="isInstalling === true"
      @close-loading="() => closeLoading()"
    />
  </WindowFrame>
</template>

<script setup lang="ts">
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models'
import { storeToRefs } from 'pinia'

enum states {
  ADD_PRROGAM,
  REMOVE_PROGRAM,
}

const { program } = defineProps<{
  program: IProgram
}>()

const programsstore = programsStore()
const { notInstalledPrograms } = storeToRefs(programsstore)

const state = ref<states>(states.REMOVE_PROGRAM)
const isInstalling = ref<boolean>(false)
const selectedProgram = ref<IProgram | undefined>()

const installedPrograms = computed(() =>
  programsstore.installedPrograms
    .map((installedProgram) => installedProgram.program)
    .filter((installedPrograms) => installedPrograms?._id !== '645be25c282005257c879cbc')
)

const menuButtons = [
  {
    clicked: () => {
      changeState(states.REMOVE_PROGRAM)
    },
    text: 'Remove Program',
    icon: 'fa-computer',
    active: states.REMOVE_PROGRAM,
  },
  {
    clicked: () => {
      changeState(states.ADD_PRROGAM)
    },
    text: 'Add Program',
    icon: 'fa-folder-plus',
    active: states.ADD_PRROGAM,
  },
]

const addOrRemoveProgram = async (isRemoving: boolean) => {
  isInstalling.value = true

  if (selectedProgram.value != undefined) {
    if (isRemoving === true) {
      await programsstore.deleteInstalledProgram(selectedProgram.value._id)
    } else {
      await programsstore.createInstalledProgram(selectedProgram.value._id)
    }
  }
}

const changeState = (newState: states) => {
  state.value = newState
  selectedProgram.value = undefined
}

const changeSelectedProgram = (program: IProgram) => {
  selectedProgram.value = program
}

const closeLoading = () => {
  isInstalling.value = false
}
</script>
