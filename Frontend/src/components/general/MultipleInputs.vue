<template lang="pug">
template(v-if="name !== undefined")
  label(for="name") Full name:
  input.bg-shadow-inner(
    type="text" 
    :value="name" 
    @input="$emit('update:name', $event.target.value)" 
    id="name"
  )

template(v-if="addressLine !== undefined")
  label.mt-4(for="address-line") Address:
  input.bg-shadow-inner(
    type="text" 
    :value="addressLine" 
    @input="$emit('update:addressLine', $event.target.value)" 
    id="address-line"
  )

template(v-if="streetNumber !== undefined")
  label.mt-4(for="street-house-number") Street nr:
  input.bg-shadow-inner(
    type="text" 
    :value="streetNumber" 
    @input="$emit('update:streetNumber', $event.target.value)" 
    id="street-house-number"
  )

template(v-if="town !== undefined")
  label.mt-4(for="town-city") Town/City:
  input.bg-shadow-inner(
    type="text" 
    :value="town" 
    @input="$emit('update:town', $event.target.value)" 
    id="town-city"
  )

template(v-if="country !== undefined")
  label.mt-4(for="country") Country:
  input.bg-shadow-inner(
    type="text" 
    :value="country" 
    @input="$emit('update:country', $event.target.value)" 
    id="country"
  )

template(v-if="postcode !== undefined")
  label.mt-4(for="postcode") Postcode:
  input.bg-shadow-inner(
    type="text" 
    :value="postcode" 
    @input="$emit('update:postcode', $event.target.value)" 
    id="postcode"
  )

template(v-if="phoneNumber !== undefined")
  label.mt-4(for="phone-number") Phone number:
  input.bg-shadow-inner(
    type="text" 
    :value="phoneNumber" 
    @input="$emit('update:phoneNumber', $event.target.value)" 
    id="phone-number"
  )

template(v-if="homeAddress !== undefined")
  label.mt-4(for="is-home-address") Is home address?:
  input.bg-shadow-inner(
    type="checkbox" 
    :checked="homeAddress" 
    @change="$emit('update:homeAddress', $event.target.checked)" 
    id="is-home-address"
  )
  
template(v-if="color !== undefined")
  label.mt-4(for="color") Color:
  input.bg-shadow-inner(
    type="text" 
    :value="color" 
    @input="$emit('update:color', $event.target.value)" 
    id="color"
  )
  
template(v-if="image !== undefined")
  label.mt-4(for="image") Image:
  input.bg-shadow-inner(
    type="text" 
    :value="image" 
    @input="$emit('update:image', $event.target.value)" 
    id="image"
  )

</template>

<script setup lang="ts">
const { name, addressLine, streetNumber, town, country, postcode, phoneNumber, homeAddress, color, image } = defineProps({
  name: {
    type: String,
  },
  addressLine: {
    type: String,
  },
  streetNumber: {
    type: String,
  },
  town: {
    type: String,
  },
  country: {
    type: String,
  },
  postcode: {
    type: String,
  },
  phoneNumber: {
    type: String,
    default: ''
  }, 
  homeAddress: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
  },
  image: {
    type: String
  }
})
</script>

<style lang="sass" scoped>
.invalid
  border: 1px solid red
</style>