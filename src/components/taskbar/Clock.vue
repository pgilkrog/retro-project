<template lang="pug">
.px-3.m-1.left-bar.d-flex.align-items-center.p-2.bg-shadow-inner.text-dark.rounded
  | {{ time }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup () {
    const time = ref('')

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

    onMounted(() => {
      updateTime()
      setInterval(() => updateTime(), 3000)
    })

    return {
      time
    }
  }
})
</script>