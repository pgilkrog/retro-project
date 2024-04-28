<template lang="pug">
div(class="flex flex-col")
  InputComponent(v-model="info.name" placeholder="Name")
  InputComponent(v-model="info.addressLine" placeholder="Addressline")
  InputComponent(v-model="info.streetNumber" placeholder="Street number")
  InputComponent(v-model="info.town" placeholder="Town")
  InputComponent(v-model="info.country" placeholder="Country")
  InputComponent(v-model="info.postcode" placeholder="Postcode" type="number")
  InputComponent(v-model="info.phoneNumber" placeholder="Phone")
  InputComponent(v-model="info.homeAddress" label="Home Address" type="checkbox")
div(class="flex flex-col my-4")
  p name: {{ info.name }}
  p address: {{ info.addressLine }}
  p streetnumber: {{ info.streetNumber }}
  p town {{ info.town }}
  p country {{ info.country }}
  p postcode {{ info.postcode }}
  p phone {{ info.phoneNumber }}
  p is Homeaddress {{ info.homeAddress }}

ButtonComponent(text="Print" @clicked="printInfo()" size="full")
</template>

<script setup lang="ts">
import { userStore } from "@/stores/userStore"

const userstore = userStore()

const info = ref({
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
  console.log(info)
}

</script>

<style lang="sass" scoped></style>
