import { defineStore } from "pinia"
import type { IProgram } from '@/models/IProgram'
import type { PropType } from "vue"

export const programsStore = defineStore("programs", {
  state: () => ({
    _programs: [] as IProgram[]
  }),
  actions: {
    setPrograms(programs: any) {
      this._programs = programs
    }
  },
  getters: {
    getPrograms: (state) => state._programs
  }
})