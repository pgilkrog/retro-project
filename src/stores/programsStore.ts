import { defineStore } from "pinia"
import type { IProgram } from '@/models/IProgram'
import jsondata from '@/assets/programsData.json'

export const programsStore = defineStore("programs", {
  state: () => ({
    _activePrograms: [] as IProgram[],
    _programs: JSON.parse(JSON.stringify(jsondata)) as IProgram[]
  }),
  actions: {
    setActivePrograms(programs: any) {
      this._activePrograms = programs
    },
    addProgramToActive(program: IProgram) {
      if (this._activePrograms.find(x => x.Name === program.Name) === undefined) {
        this._activePrograms.push(program)
      }
    },
    removeProgramFromActive(program: IProgram) {
      if (this._activePrograms.find(x => x.Name === program.Name)) {
        this.setActivePrograms(this._activePrograms.filter(x => x.Name !== program.Name))
      }
    }
  },
  getters: {
    getActivePrograms: (state) => state._activePrograms,
    getPrograms: (state) => state._programs as IProgram[]
  }
})