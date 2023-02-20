<template lang="pug">
.shut-down.d-flex.justify-content-center.align-items-center.flex-column.text-white
  h1.bi.bi-pc-display
  h1 The computer is shutting down...
  h4 Don't close down your browser
  //- div.progress
  //-   div.progress-bar(
  //-     role="progressbar" 
  //-     :aria-valuenow="progressValue" 
  //-     aria-valuemin="0" 
  //-     aria-valuemax="100"
  //-   ) {{ progressValue }}%
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      progressValue: 0 as number
    }
  },
  mounted () {
    // this.startLoading()
  },
  methods: {
    startLoading () {
      let interval = setInterval(() => {
        if (this.progressValue < 100) {
          this.progressValue += 1
        } else {
          clearInterval(interval)
        }
      }, 100)
    }
  }
})
</script>