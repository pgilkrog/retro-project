<template>
  <div class="flex flex-col">
    <InputComponent
      v-model="info.name"
      placeholder="Name"
    />
    <InputComponent
      v-model="info.addressLine"
      placeholder="Addressline"
    />
    <InputComponent
      v-model="info.streetNumber"
      placeholder="Street number"
    />
    <InputComponent
      v-model="info.town"
      placeholder="Town"
    />
    <InputComponent
      v-model="info.country"
      placeholder="Country"
    />
    <InputComponent
      v-model="info.postcode"
      placeholder="Postcode"
      type="number"
    />
    <InputComponent
      v-model="info.phoneNumber"
      placeholder="Phone"
    />
    <CheckboxComponent
      v-model="info.homeAddress"
      label="Home Address"
    />
  </div>
  <div class="flex flex-col my-4">
    <p>name: {{ info.name }}</p>
    <p>address: {{ info.addressLine }}</p>
    <p>streetnumber: {{ info.streetNumber }}</p>
    <p>town {{ info.town }}</p>
    <p>country {{ info.country }}</p>
    <p>postcode {{ info.postcode }}</p>
    <p>phone {{ info.phoneNumber }}</p>
    <p>is Homeaddress {{ info.homeAddress }}</p>
  </div>
  <ButtonComponent
    text="Print"
    @clicked="printInfo()"
    size="full"
  />
</template>

<script setup lang="ts">
const info = ref({
  name: '',
  addressLine: '',
  streetNumber: '',
  town: '',
  country: '',
  postcode: '',
  phoneNumber: '',
  homeAddress: false,
})

const printInfo = () => {
  console.log(info)
}
</script>
