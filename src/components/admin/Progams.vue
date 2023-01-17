<template lang="pug">
.programs-component
  WindowFrame(:program="{Id: 3245, Name: 'Manage Programs', IsActive: true, Image: ''}" variant="info")
    .row.p-4

</template>

<script lang="ts">
import DBHelper from '@/helpers/DBHelper';
import type { IProgram } from '@/models';
import WindowFrame from '../WindowFrame.vue'

export default {
  components: {
    WindowFrame
  },
  data() {
    return {
      allPrograms: DBHelper.getAll('programs').then((data: any) => {
        debugger
      })
    }
  },
  methods: {
  }
}
</script>