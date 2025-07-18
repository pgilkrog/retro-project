<template>
  <div class="manage-programs">
    <WindowFrame
      :program
      :is-moveable="true"
    >
      <div class="wrapper flex flex-col m-2">
        <ButtonComponent
          class="mb-4"
          @clicked="setEmptyProgram()"
          text="Add new program"
          size="full"
        />
        <div
          class="hover hover:bg-gray-200 flex bg-shadow p-1 justify-between cursor-pointer mt-1"
          v-for="aProgram in allPrograms"
          :key="aProgram._id"
        >
          <div class="flex items-center">
            <IconComponent
              class="mx-2"
              name="fa-pencil"
              color="yellow"
              size="25"
              @click.prevent="setUpdateState(true, aProgram)"
            />
            <p class="mx-2">
              {{ `${aProgram.sortOrder}: ${aProgram.name}` }}
            </p>
          </div>
          <IconComponent
            name="bi-trash-fill"
            color="red"
            size="25"
            @click="deleteProgram(aProgram)"
          />
        </div>
      </div>
    </WindowFrame>

    <WindowFrame
      v-if="showManageProgram"
      :program="manageProgramProgram"
      :is-moveable="true"
    >
      <div
        v-if="programInfo !== undefined"
        class="add-program flex flex-col p-4"
      >
        <InputComponent
          v-model="programInfo.name"
          label="Name"
          placeholder="name"
        />
        <InputComponent
          v-model="programInfo.displayName"
          label="Display name"
          placeholder="displayName"
        />
        <InputComponent
          v-model="programInfo.image"
          label="Image"
          placeholder="image"
        />
        <InputComponent
          v-model="programInfo.color"
          label="Color"
          placeholder="color"
        />
        <InputComponent
          v-model="programInfo.sortOrder"
          label="Sort Order"
          type="number"
        />
        <InputComponent
          v-model="programInfo.type"
          label="Type"
          placeholder="type"
        />
        <div class="flex mt-3 justify-center">
          <ButtonComponent
            @clicked="changeShowManageProgram(false)"
            text="Cancel"
          />
          <template v-if="updateState === true">
            <ButtonComponent
              @clicked="updateProgram()"
              text="Update"
            />
          </template>
          <template v-else>
            <ButtonComponent
              @clicked="addProgram()"
              text="Add Program"
            />
          </template>
        </div>
      </div>
    </WindowFrame>

    <Validating
      v-if="showValidation === true"
      :text="'Delete program: ' + programInfo?.displayName"
      @ok="ok()"
      @cancel="cancel()"
    />
  </div>
</template>

<script setup lang="ts">
import { programsStore } from '@/stores'
import type { IProgram } from '@/models'
import { storeToRefs } from 'pinia'

const { program } = defineProps<{
  program: IProgram
}>()

const programsstore = programsStore()
const { allPrograms } = storeToRefs(programsstore)

const showManageProgram = ref(false)
const updateState = ref(false)

const programInfo = ref<IProgram | undefined>()

const showValidation = ref(false)

const manageProgramProgram = {
  name: 'ManageProgram',
  displayName: 'Manage Program',
  color: 'warning',
  image: 'fa-pencil',
  isActive: true,
}

onMounted(() => {
  console.log('ManagePrograms mounted')
})

const addProgram = async () => {
  if (
    programInfo.value !== undefined &&
    programInfo.value.name !== '' &&
    programInfo.value.image !== '' &&
    programInfo.value.displayName !== ''
  ) {
    await programsstore.createProgram(programInfo.value)
    resetInputs()
  }
}

const deleteProgram = (program: IProgram) => {
  programInfo.value = program
  showValidation.value = true
}

const updateProgram = async () => {
  if (programInfo.value !== undefined) {
    await programsstore.updateProgram(programInfo.value)
  }
}

const resetInputs = () => {
  programInfo.value = undefined
  programInfo.value = undefined
}

const ok = async () => {
  if (programInfo.value === undefined) return
  else await programsstore.deleteProgram(programInfo.value)
}

const cancel = () => {
  showValidation.value = false
  resetInputs()
}

const setUpdateState = (state: boolean, program: IProgram | undefined) => {
  updateState.value = state
  showManageProgram.value = true

  if (state === true) {
    programInfo.value = program
    programInfo.value = program
  } else {
    resetInputs()
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
