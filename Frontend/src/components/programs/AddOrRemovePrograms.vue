<template lang="pug">
.add-or-remove-programs
  WindowFrame(:program="program")
    .row.p-2
      .col-4.gx-0.ps-3
        .d-flex.flex-column
          button.btn.d-flex.flex-column.align-items-center
            IconComponent(
              name="fa-computer"
              variant="dark"
              size="42"
            )
            p Change or Remove Program
          button.btn.d-flex.flex-column.align-items-center
            IconComponent(
              name="fa-folder-plus"
              variant="dark"
              size="42"
            )
            p Add program
      .col-8
        .bg-white.p-2.bg-shadow-inner
          .d-flex.align-items-center(v-for="(program, index) in allPrograms" :key="index")
            IconComponent.me-3(:variant="program.color === 'light' ? 'dark' : program.color" :name="program.image") 
            p {{ program.DisplayName }}
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import WindowFrame from '../WindowFrame.vue';
import DBHelper from '@/helpers/DBHelper';
import { programsStore } from '@/stores/programsStore';

export default defineComponent({
  name: 'addOrRemoveProgram',
  components: {
    WindowFrame
  },
  props: {
    program: Object
  },
  setup() {
    const programsstore = programsStore()
    const allPrograms = computed(() => programsstore.getPrograms)
    const availablePrograms = computed(() => programsstore.getPrograms)

    return {
      allPrograms,
      availablePrograms
    }
  }
})
</script>

<style lang="sass" scoped>
</style>