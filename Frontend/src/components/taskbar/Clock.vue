<template lang="pug">
.clock-text {{ time }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { errorStore } from '@/stores/errorStore'

export default defineComponent({
  setup () {
    const time = ref('')
    const errorstore = errorStore()

    const updateTime = () => {
      var cd = new Date()
      time.value =  zeroPadding(cd.getHours(), 2) + ':' +  zeroPadding(cd.getMinutes(), 2)    
    }
    const zeroPadding = (num: number, digit: number) => {
        var zero = ''
        for(var i = 0; i < digit; i++) {
            zero += '0'
        }
        return (zero + num).slice(-digit)
    }

    const addBug = () => {
      errorstore.setError('Something went wrong lol :D')
    }

    onMounted(() => {
      updateTime()
      setInterval(() => updateTime(), 3000)
    })

    return {
      time,
      addBug
    }
  }
})
</script>