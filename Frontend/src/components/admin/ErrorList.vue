<template lang="pug">
.error-list(v-if="errorList !== undefined")
  .error-item(v-for="(error, index) in errorList" :ket="index")
    p {{ error.text }}
</template>

<script lang="ts">
import type { IErrorItem } from '@/models';
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'errorList',
  async setup() {
    const errorList = ref()
    
    // try {
    //   await DBHelper.getAll('errorLogs').then(data => {
    //     let temp = []
    //     for(let item in data) {
    //       temp.push(data[+item] as IErrorItem)
    //     }
    //     errorList.value = temp
    //   }) 
    // } catch (error) {
    //   console.log(error)
    // }

    return {
      errorList
    }
  }
})
</script>

<style lang="sass" scoped>
</style>