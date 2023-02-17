import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import DBHelper from "@/helpers/DBHelper"

export const programsStore = defineStore("programs", {
  state: () => ({
    activePrograms: [] as IProgram[],
    programs: [] as IProgram[],
    collectionName: 'programs'
  }),
  actions: {
    init() {
      DBHelper.getAll(this.collectionName).then(data => {
        let temp = []
        for(let item in data) {
          temp.push(data[+item] as IProgram)
        }
        this.programs = temp
      })
    },
    setActivePrograms(programs: IProgram[]) {
      this.activePrograms = programs
    },
    addProgramToActive(program: IProgram) {
      if (this.activePrograms.find(x => x.Id === program.Id) === undefined) {
        program.IsActive = true
        this.activePrograms.push(program)
      }
    },
    removeProgramFromActive(program: IProgram) {
      if (this.activePrograms.find(x => x.Name === program.Name)) {
        this.setActivePrograms(this.activePrograms.filter(x => x.Id !== program.Id))
      }
    },
    setProgramActiveState(program: IProgram) {
      this.activePrograms.find(x => {
        if(x.Id === program.Id)
          x.IsActive = !x.IsActive
      })
    },
  },
  getters: {
    getActivePrograms: (state) => state.activePrograms as IProgram[],
    getPrograms: (state) => state.programs as IProgram[]
  }
})