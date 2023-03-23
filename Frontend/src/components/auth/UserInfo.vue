<template lang="pug">
.d-flex.flex-column
  MultipleInputs(
    v-model:name="info.name" 
    v-model:addressLine="info.addressLine"
    v-model:streetNumber="info.streetNumber" 
    v-model:town="info.town" 
    v-model:country="info.country"
    v-model:postcode="info.postcode" 
    v-model:phoneNumber="info.phoneNumber"
    v-model:homeAddress="info.homeAddress"
  )
.d-flex.flex-column.mt-4
  p name: {{ info.name }}
  p address: {{ info.addressLine }}
  p streetnumber: {{ info.streetNumber }}
  p town {{ info.town }}
  p country {{ info.country }}
  p postcode {{ info.postcode }}
  p phone {{ info.phoneNumber }}
  p is Homeaddress {{ info.homeAddress }}

button.btn.mt-4(@click="printInfo()") Print
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import MultipleInputs from '../general/MultipleInputs.vue'

export default defineComponent({
  name: 'userInfo',
  components: {
    MultipleInputs
  },
  setup() {
    const info = reactive({
      name: "",
      addressLine: "",
      streetNumber: "",
      town: "",
      country: "",
      postcode: "",
      phoneNumber: "",
      homeAddress: false,
    });

    const printInfo = () => {
      console.log(info)
    }

    return {
      info,
      printInfo
    };
  }
})
</script>

<style lang="sass" scoped>
</style>