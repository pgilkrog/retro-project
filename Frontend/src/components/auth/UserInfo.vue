<template lang="pug">
.d-flex.flex-column
  BaseInput(v-model="info.name" placeholder="Name")
  BaseInput(v-model="info.addressLine" placeholder="Addressline")
  BaseInput(v-model="info.streetNumber" placeholder="Street number")
  BaseInput(v-model="info.town" placeholder="Town")
  BaseInput(v-model="info.country" placeholder="Country")
  BaseInput(v-model="info.postcode" placeholder="Postcode")
  BaseInput(v-model="info.phoneNumber" placeholder="Phone")
  BaseInput(v-model="info.homeAddress" label="Home Address" type="checkbox")
.d-flex.flex-column.my-4
  p name: {{ info.name }}
  p address: {{ info.addressLine }}
  p streetnumber: {{ info.streetNumber }}
  p town {{ info.town }}
  p country {{ info.country }}
  p postcode {{ info.postcode }}
  p phone {{ info.phoneNumber }}
  p is Homeaddress {{ info.homeAddress }}

Btn(text="Print" @clicked="printInfo()" size="full")
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { userStore } from '@/stores/userStore'

const userstore = userStore()

const info = reactive({
  name: "",
  addressLine: "",
  streetNumber: "",
  town: "",
  country: "",
  postcode: "",
  phoneNumber: "",
  homeAddress: false,
})

const printInfo = () => {
  console.log(userstore.userData)
  // userstore.updateUserSettings(userstore.userData.settings)
}
</script>

<style lang="sass" scoped>
</style>