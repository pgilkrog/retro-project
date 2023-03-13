<template lang="pug">
label(for="name") Full name:
input.bg-shadow-inner(type="text" :value="name" @input="$emit('update:name', $event.target.value)" id="name")

label(for="address-line") Address:
input.bg-shadow-inner(type="text" :value="addressLine" @input="$emit('update:addressLine', $event.target.value)" id="address-line")

label(for="street-house-number") Street nr:
input.bg-shadow-inner(type="text" :value="streetNumber" @input="$emit('update:streetNumber', $event.target.value)" id="street-house-number")

label(for="town-city") Town/City:
input.bg-shadow-inner(type="text" :value="town" @input="$emit('update:town', $event.target.value)" id="town-city")

label(for="country") Country:
input.bg-shadow-inner(type="text" :value="country" @input="$emit('update:country', $event.target.value)" id="country")

label(for="postcode") Postcode:
input.bg-shadow-inner(type="text" :value="postcode" @input="$emit('update:postcode', $event.target.value)" id="postcode")

label(for="phone-number") Phone number:
input.bg-shadow-inner(type="text" :value="phoneNumber" @input="$emit('update:phoneNumber', $event.target.value)" id="phone-number")

label(for="is-home-address") Is home address?:
input.bg-shadow-inner(type="checkbox" :checked="homeAddress" @change="$emit('update:homeAddress', $event.target.checked)" id="is-home-address")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'component-name',
  props: {
    name: {
      type: String,
      default: ""
    },
    addressLine: {
      type: String,
      default: ""
    },
    streetNumber: {
      type: String,
      default: ""
    },
    town: {
      type: String,
      default: ""
    },
    country: {
      type: String,
      default: ""
    },
    postcode: {
      type: String,
      default: ""
    },
    phoneNumber: {
      type: String,
      default: ""
    }, 
    homeAddress: {
        type: Boolean,
        default: false,
    },
  },
  setup() {
    return {
      
    }
  }
})
</script>

<style lang="sass" scoped>

</style>