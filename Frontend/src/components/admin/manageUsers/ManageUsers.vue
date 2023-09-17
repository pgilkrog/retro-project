<template lang="pug">
.manage-users
  WindowFrame(:program="program" :isMoveable="true")
    Suspense(timeout="0")
      template(#default)
        UsersList(v-on:setSelectedUser="setSelectedUser($event)")
      template(#fallback)
        .d-flex.justify-content-center.py-4
          .spinner-border.text-dark
  WindowFrame(
    :program="{name: 'ManageUser', displayName: 'Manage User', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
    v-if="showManageUser"
  )
    .d-flex.flex-column.p-4
      BaseInput(v-model="userInfo.firstName" label="First Name")
      BaseInput(v-model="userInfo.lastName" label="Last Name")
      BaseInput(v-model="userInfo.email" label="Email")
      BaseInput(v-model="userInfo.type" label="Type")
      //- BaseInput(v-model="userInfo.installedPrograms" label="Installed Programs")
      Btn.mt-3(@clicked="changeShowManageUserSettings(true)" text="Settings" size="full")
      .d-flex.mt-3.justify-content-between
        Btn(@clicked="changeShowManageUser(false)" text="Cancel")
        Btn(@clicked="updateUser()" text="Update")
  
  WindowFrame(
    :program="{name: 'ManageUserSettings', displayName: 'Manage User Settings', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
    v-if="showManageUserSettings"
  )
    .d-flex.flex-column.p-4
      BaseInput(v-model="userSettingsInfo.backgroundColour" label="Background color")
      BaseInput(v-model="userSettingsInfo.backgroundImage" label="Background Image")
      BaseInput(v-model="userSettingsInfo.useBackground" label="Use Background" type="checkbox")
      BaseInput(v-model="userSettingsInfo.theme" label="Theme")
      .d-flex.mt-3.justify-content-between
        Btn(@clicked="changeShowManageUserSettings(false)" text="Cancel")
        Btn(@clicked="updateUserSettings()" text="Update")
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { userStore } from '@/stores/userStore'
import type { IProgram, IUser, IUserSettings } from '@/models/index'
import UsersList from './UsersList.vue'
import type { PropType } from 'vue'

const { program } = defineProps({
  program: Object as PropType<IProgram>
})

const showManageUser = ref(false)
const showManageUserSettings = ref(false)
let selectedUser = {}
let selectedUserSettings = {}

const userstore = userStore()
const userInfo = reactive({
  firstName: "",
  lastName: "",
  email: "",
  type: "",
  installedPrograms: [] as string[]
})
const userSettingsInfo = reactive({
  backgroundColour: "",
  backgroundImage: "",
  useBackground: false,
  theme: ""
})

// const allUsers = computed(() => userstore.allUsers)

const updateUser = () => {
  let temp = selectedUser as IUser
  temp.firstName = userInfo.firstName
  temp.lastName = userInfo.lastName,
  temp.email = userInfo.email,
  temp.type = userInfo.type,
  temp.installedPrograms = userInfo.installedPrograms
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

const deleteUser = (user: IUser) => {
  
}

const setSelectedUser = (user: IUser) => {
  changeShowManageUser(true)
  userInfo.firstName = user.firstName
  userInfo.lastName = user.lastName,
  userInfo.email = user.email,
  userInfo.type = user.type,
  userInfo.installedPrograms = user.installedPrograms
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

<style lang="sass" scoped>
</style>