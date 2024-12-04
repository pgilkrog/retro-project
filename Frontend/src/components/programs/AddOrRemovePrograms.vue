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
          :key
          v-bind="button" 
          :active="state === button.active"
          @clicked="button.clicked" 
        />
      </div>
      <div class="program-list bg-gray-300 p-4 bg-shadow-inner">
        <ProgramsList 
          v-if="state === 'removePrograms'" 
          title="Installed programs" 
          :program-list="installedPrograms" 
          :selected-program-id="selectedProgram?._id ?? ''" 
          @change-selected-program="(program: IProgram) => changeSelectedProgram(program)" 
        />
        <ProgramsList 
          v-if="state === 'addPrograms'" 
          title="Not installed programs" 
          :program-list="notInstalledPrograms" 
          :selected-program-id="selectedProgram?._id ?? ''" 
          @change-selected-program="(program: IProgram) => changeSelectedProgram(program)" 
        />
      </div>
    </div>
    <div class="row p-2">
      <div class="flex justify-end">
        <ButtonComponent 
          v-if="state === 'addPrograms'" 
          :disabled="selectedProgram === undefined" 
          text="Install" 
          @clicked="installProgram()" 
        />
        <ButtonComponent 
          v-else 
          text="Remove" 
          :disabled="selectedProgram === undefined" 
          @clicked="removeProgram()" 
        />
      </div>
    </div>
    <Loading 
      v-if="isInstalling === true" 
      @close-loading="closeLoading()" 
    />
  </WindowFrame>
</template>

<script setup lang="ts">
import { programsStore } from '@/stores/programsStore'
import type { IProgram } from '@/models/index'
import { storeToRefs } from 'pinia';

const { program } = defineProps<{
  program: IProgram
}>()

const programsstore = programsStore()
const state = ref('removePrograms')
const isInstalling = ref(false)

const selectedProgram = ref<IProgram | undefined>()

const { notInstalledPrograms } = storeToRefs(programsstore)
const installedPrograms = computed(() =>
  programsstore.installedPrograms.map((IPro) => IPro.program)
)

const menuButtons = [
  {
    clicked: () => {changeState('removePrograms')},
    text: 'Remove Program',
    icon: 'fa-computer',
    active: 'removePrograms',
  },
  {
    clicked: () => {changeState('addPrograms')},
    text: 'Add Program',
    icon: 'fa-folder-plus',
    active: 'addPrograms',
  },
]

onMounted(() => {
  console.log('GOT MOUNTED')
})

const installProgram = () => {
  isInstalling.value = true

  if ( selectedProgram.value !== undefined) {
    programsstore.createInstalledProgram(selectedProgram.value._id) 
  }

  isInstalling.value = false
}

const removeProgram = () => {
  isInstalling.value = true

  programsstore.deleteInstalledProgram(selectedProgram.value?._id ?? '')
}

const changeState = (newState: string) => {
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
