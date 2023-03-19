import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import DBHelper from "@/helpers/DBHelper"

export const programsStore = defineStore("programs", {
  state: () => ({
    _activePrograms: [] as IProgram[],
    _programs: [] as IProgram[],
    collectionName: 'programs'
  }),
  getters: {
    getActivePrograms: (state) => state._activePrograms as IProgram[],
    getPrograms: (state) => state._programs as IProgram[]
  },
  actions: {
    async init() {
      await DBHelper.getAll(this.collectionName).then(data => {
        let temp = []
        for(let item in data) {
          temp.push(data[+item] as IProgram)
        }
        this._programs = temp
      })
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
      this.setActivePrograms(this._activePrograms.filter(x => x.Id !== program.Id))
    },
    setProgramActiveState(program: IProgram) {
      this._activePrograms.find(x => {
        if(x.Id === program.Id)
          x.IsActive = !x.IsActive
      })
    },
    updateProgram(program: IProgram) {
      DBHelper.update(this.collectionName, program)
    },
    deleteProgram(program: IProgram) {
      DBHelper.delete(this.collectionName, program.Id.toString())
    }
  }
})