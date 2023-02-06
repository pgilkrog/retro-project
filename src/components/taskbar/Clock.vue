<template lang="pug">
.px-3.m-1.left-bar.d-flex.align-items-center.p-2.bg-shadow-inner.text-dark.rounded
  |   {{ time }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      time: ""
    }
  }, 
  mounted() {
    this.updateTime()
    setInterval(() => this.updateTime(), 3000)
  },
  methods: {
    updateTime() {
      var cd = new Date()
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2)    
    },
    zeroPadding(num: number, digit: number) {
        var zero = ''
        for(var i = 0; i < digit; i++) {
            zero += '0'
        }
        return (zero + num).slice(-digit)
    }
  }
})
</script>