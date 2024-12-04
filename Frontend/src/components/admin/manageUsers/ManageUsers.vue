<template>
  <div class="manage-users">
    <WindowFrame
      :program="program"
      :is-moveable="true"
    >
      <Suspense timeout="0">
        <template #default>
          <UsersList @set-selected-user="setSelectedUser($event)" />
        </template>
        <template #fallback>
          <div class="flex justify-center py-4">
            <div class="spinner-border text-gray-700" />
          </div>
        </template>
      </Suspense>
    </WindowFrame>

    <WindowFrame
      v-if="showManageUser === true"
      :program="manageUserProgram"
      :is-moveable="true"
    >
      <div
        v-if="userInfo !== undefined"
        class="flex flex-col p-4"
      >
        <InputComponent
          v-model="userInfo.firstName"
          label="First Name"
        />
        <InputComponent
          v-model="userInfo.lastName"
          label="Last Name"
        />
        <InputComponent
          v-model="userInfo.email"
          label="Email"
        />
        <InputComponent
          v-model="userInfo.type"
          label="Type"
        />
        <ButtonComponent
          class="mt-3"
          @clicked="changeShowManageUserSettings(true)"
          text="Settings"
          size="full"
        />
        <div class="flex mt-3 justify-center">
          <ButtonComponent
            @clicked="changeShowManageUser(false)"
            text="Cancel"
          />
          <ButtonComponent
            @clicked="updateUser()"
            text="Update"
          />
        </div>
      </div>
    </WindowFrame>

    <WindowFrame
      v-if="showManageUserSettings === true"
      :program="manageUserSettingsProgram"
      :is-moveable="true"
    >
      <div
        v-if="userSettingsInfo !== undefined"
        class="flex flex-col p-4"
      >
        <InputComponent
          v-model="userSettingsInfo.backgroundColour"
          label="Background color"
        />
        <InputComponent
          v-model="userSettingsInfo.backgroundImage"
          label="Background Image"
        />
        <CheckboxComponent
          v-model="userSettingsInfo.useBackground"
          label="Use Background"
        />
        <InputComponent
          v-model="userSettingsInfo.theme"
          label="Theme"
        />
        <div class="flex mt-3 justify-center">
          <ButtonComponent
            @clicked="changeShowManageUserSettings(false)"
            text="Cancel"
          />
          <ButtonComponent
            @clicked="updateUserSettings()"
            text="Update"
          />
        </div>
      </div>
    </WindowFrame>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/stores'
import type { IProgram, IUser, IUserSettings } from '@/models'

const { program } = defineProps<{
  program: IProgram
}>()

const userstore = userStore()

const showManageUser = ref(false)
const showManageUserSettings = ref(false)

const userInfo = ref<IUser | undefined>()
const userSettingsInfo = ref<IUserSettings | undefined>()

const manageUserProgram = {
  name: 'ManageUser',
  displayName: 'Manage User',
  color: 'warning',
  image: 'fa-pencil',
  isActive: true,
}
const manageUserSettingsProgram = {
  name: 'ManageUserSettings',
  displayName: 'Manage User Settings',
  color: 'warning',
  image: 'fa-pencil',
  isActive: true,
}

const updateUser = () => {
  if (userInfo.value !== undefined) {
    userstore.updateUser(userInfo.value)
    userInfo.value = undefined
    changeShowManageUser(false)
  }
}

const updateUserSettings = () => {
  if (userSettingsInfo.value !== undefined) {
    userstore.updateUserSettings(userSettingsInfo.value)
    userSettingsInfo.value = undefined
    changeShowManageUserSettings(false)
  }
}

const setSelectedUser = (user: IUser) => {
  userInfo.value = user
  userSettingsInfo.value = user.settings
  changeShowManageUser(true)
}

const changeShowManageUser = (bool: boolean) => {
  showManageUser.value = bool
}

const changeShowManageUserSettings = (bool: boolean) => {
  showManageUserSettings.value = bool
}
</script>
