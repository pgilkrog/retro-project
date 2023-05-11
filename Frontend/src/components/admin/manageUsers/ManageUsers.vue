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
      .d-flex.mt-3.justify-content-between
        button.btn(@click="changeShowManageUser(false)") Cancel
        button.btn(@click="updateUser()") Update
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, ref } from 'vue'
import { userStore } from '@/stores/userStore'
import UserInputs from './UserInputs.vue'
import type { IUser, IUserSettings } from '@/models/index'

export default defineComponent({
  name: 'manageUsers', 
  components: {
    UserInputs
  }, 
  props: {
    program: Object
  },
  setup() {
    let showManageUser = ref(false)
    let selectedUser = {}

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
    const allUsers = computed(() => userstore.getAllUsers)

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

    const updateUserSettings = (settings: IUserSettings) => {

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
    }

    const resetInputs = () => {
      userInfo.firstName = ''
      userInfo.lastName = ''
      userInfo.email = ''
      userInfo.type = ''
      userInfo.installedPrograms = []
      selectedUser = {}
    }

    const changeShowManageUser = (bool: boolean) => {
      showManageUser.value = bool
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
      updateUser,
      updateUserSettings,
      setSelectedUser,
      deleteUser,
      resetInputs
    }
  }
})
</script>

<style lang="sass" scoped>
</style>