import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import DBHelper from "@/helpers/DBHelper"
import axios from 'axios'
import { toRaw } from 'vue'

const url = 'http://localhost:4000/api/program'

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
      this.getProgramsFromDB()
      // await DBHelper.getAll(this.collectionName).then(data => {
      //   let temp = []
      //   for(let item in data) {
      //     temp.push(data[+item] as IProgram)
      //   }
      //   this._programs = temp
      // })
    },
    async getProgramsFromDB() {
      try {
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
      // DBHelper.update(this.collectionName, program)
      const response = await axios.put(url + '/' + program.id, program)
      console.log(response)
    },
    async deleteProgram(program: IProgram) {
      // DBHelper.delete(this.collectionName, program.id.toString())
      const response = await axios.delete(url + '/' + program.id).finally(() => this.getProgramsFromDB())
      console.log(response)
    },
    async createProgram(program: IProgram) {
      const response = axios.post(url, program).finally(() => this.getProgramsFromDB())
      console.log('createReponse', response)
    }
  }
})