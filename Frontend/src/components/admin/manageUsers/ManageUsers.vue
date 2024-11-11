<template lang="pug">
.manage-users
  WindowFrame(:program="program" :isMoveable="true")
    Suspense(timeout="0")
      template(#default)
        UsersList(@setSelectedUser="setSelectedUser($event)")
      template(#fallback)
        div(class="flex justify-center py-4")
          .spinner-border.text-gray-700
  WindowFrame(
    :program="{name: 'ManageUser', displayName: 'Manage User', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
    v-if="showManageUser"
  )
    div(class="flex flex-col p-4")
      InputComponent(v-model="userInfo.firstName" label="First Name")
      InputComponent(v-model="userInfo.lastName" label="Last Name")
      InputComponent(v-model="userInfo.email" label="Email")
      InputComponent(v-model="userInfo.type" label="Type")
      //- InputComponent(v-model="userInfo.installedPrograms" label="Installed Programs")
      ButtonComponent.mt-3(@clicked="changeShowManageUserSettings(true)" text="Settings" size="full")
      div(class="flex mt-3 justify-center")
        ButtonComponent(@clicked="changeShowManageUser(false)" text="Cancel")
        ButtonComponent(@clicked="updateUser()" text="Update")
  WindowFrame(
    :program="{name: 'ManageUserSettings', displayName: 'Manage User Settings', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
    v-if="showManageUserSettings"
  )
    div(class="flex flex-col p-4")
      InputComponent(v-model="userSettingsInfo.backgroundColour" label="Background color")
      InputComponent(v-model="userSettingsInfo.backgroundImage" label="Background Image")
      CheckboxComponent(v-model="userSettingsInfo.useBackground" label="Use Background")
      InputComponent(v-model="userSettingsInfo.theme" label="Theme")
      div(class="flex mt-3 justify-center")
        ButtonComponent(@clicked="changeShowManageUserSettings(false)" text="Cancel")
        ButtonComponent(@clicked="updateUserSettings()" text="Update")
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { userStore } from '@/stores/userStore'
import type { IProgram, IUser, IUserSettings } from '@/models/index'

const { program } = defineProps<{
  program: IProgram
}>()

const showManageUser = ref(false)
const showManageUserSettings = ref(false)
let selectedUser = {}
let selectedUserSettings = {}

const userstore = userStore()
const userInfo = reactive({
  firstName: '',
  lastName: '',
  email: '',
  type: '',
  installedPrograms: [] as string[],
})
const userSettingsInfo = reactive({
  backgroundColour: '',
  backgroundImage: '',
  useBackground: false,
  theme: '',
})

// const allUsers = computed(() => userstore.allUsers)

const updateUser = () => {
  let temp = selectedUser as IUser
  temp.firstName = userInfo.firstName
  ;(temp.lastName = userInfo.lastName),
    (temp.email = userInfo.email),
    (temp.type = userInfo.type),
    (temp.installedPrograms = userInfo.installedPrograms)
  userstore.updateUser(temp)
  resetInputs()
  changeShowManageUser(false)
}

const updateUserSettings = () => {
  let temp = selectedUserSettings as IUserSettings
  temp.backgroundColour = userSettingsInfo.backgroundColour
  temp.backgroundImage = userSettingsInfo.backgroundImage
  temp.useBackground = userSettingsInfo.useBackground
  temp.theme = userSettingsInfo.theme
  userstore.updateUserSettings(temp)
  resetSettingsInputs()
  changeShowManageUserSettings(false)
}

const deleteUser = (user: IUser) => {}

const setSelectedUser = (user: IUser) => {
  changeShowManageUser(true)
  userInfo.firstName = user.firstName
  ;(userInfo.lastName = user.lastName),
    (userInfo.email = user.email),
    (userInfo.type = user.type),
    (userInfo.installedPrograms = user.installedPrograms)
  selectedUser = user
  changeShowManageUser(true)
  setSelectedUserSettings(user.settings)
}

const setSelectedUserSettings = (settings: IUserSettings) => {
  userSettingsInfo.backgroundColour = settings.backgroundColour
  userSettingsInfo.backgroundImage = settings.backgroundImage
  userSettingsInfo.useBackground = settings.useBackground
  userSettingsInfo.theme = settings.theme
  selectedUserSettings = settings
}

const resetInputs = () => {
  userInfo.firstName = ''
  userInfo.lastName = ''
  userInfo.email = ''
  userInfo.type = ''
  userInfo.installedPrograms = []
  selectedUser = {}
}

const resetSettingsInputs = () => {
  userSettingsInfo.backgroundColour = ''
  userSettingsInfo.backgroundImage = ''
  userSettingsInfo.useBackground = false
  userSettingsInfo.theme = ''
}

const changeShowManageUser = (bool: boolean) => {
  showManageUser.value = bool
}

const changeShowManageUserSettings = (bool: boolean) => {
  showManageUserSettings.value = bool
}
</script>
