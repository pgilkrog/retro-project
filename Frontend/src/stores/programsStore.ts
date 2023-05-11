import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import axios from 'axios'
import setAuthToken from "@/helpers/setAuthToken"

const url = 'http://localhost:4000/api/program'

export const programsStore = defineStore("programs", {
  state: () => ({
    _activePrograms: [] as IProgram[],
    _programs: [] as IProgram[],
    _installedPrograms: [] as IProgram[],
    _notInstalledPrograms: [] as IProgram[],
    collectionName: 'programs'
  }),
  getters: {
    getActivePrograms: (state) => state._activePrograms as IProgram[],
    getPrograms: (state) => state._programs as IProgram[],
    getInstalledPrograms: (state) => state._installedPrograms as IProgram[],
    getNotIntalledPrograms: (state) => state._notInstalledPrograms as IProgram[]
  },
  actions: {
    async init() {
      await this.getProgramsFromDB()
    },
    async getProgramsFromDB() {
      try {
        setAuthToken(sessionStorage.getItem('token') as string)
        await axios.get(url).then((data: any) => {
          let tempData = data.data.programs
          let tempArray: IProgram[] = []
          for(const program in tempData) {
            tempArray.push({
              id: tempData[program]._id,
              name: tempData[program].name,
              isActive: false,
              image: tempData[program].image,
              color: tempData[program].color,
              displayName: tempData[program].displayName,
              sortOrder: tempData[program].sortOrder
            } as IProgram)
          }
          this._programs = tempArray.sort((a: IProgram, b: IProgram,) => a.sortOrder - b.sortOrder)
        })
      } catch (error) {
        console.log(error)
      }
    },
    setInstalledPrograms(programs: string[]) {
      if(programs === undefined)
        return

      const newArray = programs.filter(obj1 => {
        const obj2 = this.getPrograms.find(obj2 => obj1 === obj2.id)
        return obj2 !== undefined
      }).map(obj1 => {
        const obj2 = this.getPrograms.find(obj2 => obj1 === obj2.id)
        return obj2
      })
      this._installedPrograms = newArray as IProgram[]

      let notInstalled = [] as IProgram[]
      this.getPrograms.forEach(obj2 => {
        const obj1 = newArray.find(obj1 => obj1?.id === obj2.id)
        if (!obj1) {
          notInstalled.push(obj2)
        }
      })
      this._notInstalledPrograms = notInstalled
      console.log(programs)
    },
    setActivePrograms(programs: IProgram[]) {
      this._activePrograms = programs
    },
    addProgramToActive(program: IProgram) {
      if (this._activePrograms.find(x => x.id === program.id) === undefined) {
        program.isActive = true
        this._activePrograms.push(program)
      }
    },
    removeProgramFromActive(program: IProgram) {
      this.setActivePrograms(this._activePrograms.filter(x => x.id !== program.id))
    },
    setProgramActiveState(program: IProgram) {
      this._activePrograms.find(x => {
        if(x.id === program.id)
          x.isActive = !x.isActive
      })
    },
    async updateProgram(program: IProgram) {
      const response = await axios.put(url + '/' + program.id, null, { params: program })
      console.log(response)
    },
    async deleteProgram(program: IProgram) {
      const response = await axios.delete(url + '/' + program.id).finally(() => this.getProgramsFromDB())
      console.log(response)
    },
    async createProgram(program: IProgram) {
      const response = axios.post(url, null, { params: program }).finally(() => this.getProgramsFromDB())
      console.log('createReponse', response)
    }
  }
})