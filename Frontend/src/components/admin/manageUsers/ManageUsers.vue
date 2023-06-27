<template lang="pug">
.manage-users
  WindowFrame(:program="program" :isMoveable="true")
    .d-flex.bg-shadow.py-1.px-4.justify-content-between.align-items-center.rounded.pointer(v-for="item in allUsers" @click="setSelectedUser(item)") {{ item.email }}

  WindowFrame(
    :program="{name: 'ManageUser', displayName: 'Manage User', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
    v-if="showManageUser"
  )
    .d-flex.flex-column.p-4
      UserInputs(
        v-model:firstName="userInfo.firstName"
        v-model:lastName="userInfo.lastName"
        v-model:email="userInfo.email"
        v-model:type="userInfo.type"
        v-model:installedPrograms="userInfo.installedPrograms"
      )
      button.btn.w-100.mt-3(@click="changeShowManageUserSettings(true)") Settings
      .d-flex.mt-3.justify-content-between
        button.btn(@click="changeShowManageUser(false)") Cancel
        button.btn(@click="updateUser()") Update
  
  WindowFrame(
    :program="{name: 'ManageUserSettings', displayName: 'Manage User Settings', color: 'warning', image: 'fa-pencil', isActive: true}" 
    :isMoveable="true"
    v-if="showManageUserSettings"
  )
    .d-flex.flex-column.p-4
      SettingsInput(
        v-model:backgroundColour="userSettingsInfo.backgroundColour"
        v-model:backgroundImage="userSettingsInfo.backgroundImage"
        v-model:useBackground="userSettingsInfo.useBackground"
        v-model:theme="userSettingsInfo.theme"
      )
      .d-flex.mt-3.justify-content-between
        button.btn(@click="changeShowManageUserSettings(false)") Cancel
        button.btn(@click="updateUserSettings()") Update
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, ref } from 'vue'
import { userStore } from '@/stores/userStore'
import UserInputs from './UserInputs.vue'
import SettingsInput from './SettingsInput.vue'
import type { IUser, IUserSettings } from '@/models/index'

export default defineComponent({
  name: 'manageUsers', 
  components: {
    UserInputs,
    SettingsInput
  }, 
  props: {
    program: Object
  },
  setup() {
    let showManageUser = ref(false)
    let showManageUserSettings = ref(false)
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
    const allUsers = computed(() => userstore.allUsers)

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
      setSelectedUserSettings(user.settings)
    }

    const setSelectedUserSettings = (settings: IUserSettings) => {
      debugger
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

    onMounted(() => {
      userstore.setAllUsers()
    })

    return {
      allUsers,
      selectedUser,
      userInfo,
      userSettingsInfo,
      showManageUser,
      showManageUserSettings,
      updateUser,
      updateUserSettings,
      setSelectedUser,
      deleteUser,
      resetInputs,
      changeShowManageUser,
      changeShowManageUserSettings,
      setSelectedUserSettings,
      resetSettingsInputs
    }
  }
})
</script>

<style lang="sass" scoped>
</style>