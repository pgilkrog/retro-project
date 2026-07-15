<template>
  <div class="manage-programs">
    <WindowFrame
      :program
      :is-moveable="true"
    >
      <div class="wrapper flex flex-col m-2">
        <ButtonComponent
          class="mb-4"
          text="Add new program"
          size="full"
          @clicked="() => setEmptyProgram()"
        />
        <div
          v-for="aProgram in allPrograms"
          :key="aProgram._id"
          class="hover hover:bg-gray-200 flex bg-shadow p-1 justify-between cursor-pointer mt-1"
        >
          <div class="flex items-center">
            <IconComponent
              class="mx-2"
              name="fa-pencil"
              color="yellow"
              size="25"
              @click.prevent="() => setUpdateState(true, aProgram)"
            />
            <p class="mx-2">
              {{ `${aProgram.sortOrder}: ${aProgram.name}` }}
            </p>
          </div>
          <IconComponent
            name="fa-trash"
            color="red"
            size="25"
            @click="() => deleteProgram(aProgram)"
          />
        </div>
      </div>
    </WindowFrame>

    <edit-create-program
      v-if="showManageProgram === true && programInfo != undefined"
      :update-state="updateState"
      :program-to-manage="programInfo"
      @change-show-manage-program="(bool: boolean) => changeShowManageProgram(bool)"
    />

    <ValidatingComponent
      v-if="showValidation === true"
      :text="'Delete program: ' + programInfo?.displayName"
      @ok="() => ok()"
      @cancel="() => cancel()"
    />
  </div>
</template>

<script setup lang="ts">
import { programsStore } from '@/stores'
import type { IProgram } from '@/models'
import { storeToRefs } from 'pinia'
import EditCreateProgram from './EditCreateProgram.vue'

const { program } = defineProps<{
  program: IProgram
}>()

const programsstore = programsStore()

const { allPrograms } = storeToRefs(programsstore)

const programInfo = ref<IProgram | undefined>()
const showManageProgram = ref<boolean>(false)
const updateState = ref<boolean>(false)
const showValidation = ref<boolean>(false)

const deleteProgram = (program: IProgram) => {
  programInfo.value = program
  showValidation.value = true
}

const ok = async () => {
  if (programInfo.value === undefined) {
    return
  }

  await programsstore.deleteProgram(programInfo.value)
}

const cancel = () => {
  showValidation.value = false
  programInfo.value = undefined
}

const setUpdateState = (state: boolean, program: IProgram | undefined) => {
  updateState.value = state
  showManageProgram.value = true

  if (state === true) {
    programInfo.value = program
  } else {
    programInfo.value = undefined
  }
}

const changeShowManageProgram = (bool: boolean) => {
  showManageProgram.value = bool

  if (bool === true) {
    setUpdateState(false, undefined)
  }
}

const setEmptyProgram = () => {
  showManageProgram.value = true
  programInfo.value = {
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
  }
}
</script>
