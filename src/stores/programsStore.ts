import { defineStore } from "pinia"
import type { IProgram } from '@/models/IProgram'
import jsondata from '@/assets/programsData.json'

export const programsStore = defineStore("programs", {
  state: () => ({
    _activePrograms: [] as IProgram[],
    _programs: [] as IProgram[]
  }),
  actions: {
    init() {
      this._programs = JSON.parse(JSON.stringify(jsondata)) as IProgram[]
    },
    setActivePrograms(programs: IProgram[]) {
      this._activePrograms = programs
    },
    addProgramToActive(program: IProgram) {
      if (this._activePrograms.find(x => x.Id === program.Id) === undefined) {
        program.IsActive = true
        this._activePrograms.push(program)
      }
    },
    removeProgramFromActive(program: IProgram) {
      if (this._activePrograms.find(x => x.Name === program.Name)) {
        this.setActivePrograms(this._activePrograms.filter(x => x.Id !== program.Id))
      }
    },
    setProgramActiveState(program: IProgram) {
      this._activePrograms.find(x => {
        if(x.Id === program.Id)
          x.IsActive = !x.IsActive
      })
    }
  },
  getters: {
    getActivePrograms: (state) => state._activePrograms as IProgram[],
    getPrograms: (state) => state._programs as IProgram[]
  }
})