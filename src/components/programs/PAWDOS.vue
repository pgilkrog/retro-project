<template lang="pug">
WindowFrame(:program="program" variant="primary")
  .bg-black.text-white.p-4
    p Retro-Project Desktop 97
    P.ms-4 (C)Copyright Someting, Something Complete
    .my-4
    p(v-for="s in textWritten" v-html="s")
    .d-flex.mt-4
      p C:\DESKTOP>
      form(@submit.prevent="submitMethod")
        input(autofocus v-model="inputText").bg-black.text-white.w-100.border-none
</template>

<script lang="ts">
import WindowFrame from '../WindowFrame.vue'

export default {
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  data() {
    return {
      inputText: '',
      textWritten: [] as string[],
      helpText: [
        '<ol class="ms-4">' +
        '<li>Play-PingPong</li>' +
        '<li>Play-FlappyDisk</li>' +
        '</ol>'
      ]
    }
  },
  methods: {
    closeWindow() {
      this.$emit('closeWindow', 'NetworkNeighborhood')
    },
    submitMethod() {
      if (this.inputText === '')
        return

      this.textWritten.push(this.inputText)
      this.commands(this.inputText)
      this.inputText = ''
    },
    commands(text: string) {
      let tempText = text.trim().replace(" ", "").toLocaleLowerCase()
      switch (tempText) {
        case 'help': {
          this.textWritten = this.textWritten.concat(this.helpText)
          break
        }
        case 'playpingpong': {
          this.$router.push('/pingpong')
          break
        }
        case 'playflappydisk': {
          this.$router.push('/flappydisk')
          break
        }
        default: {
          break
        }
      }
        
    }
  }
}
</script>