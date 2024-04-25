import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import axios from 'axios'
import setAuthToken from "@/helpers/setAuthToken"
import { ref } from "vue"

const url = import.meta.env.VITE_BASE_URL + '/program'

export const programsStore = defineStore("programs", () => {
  const activePrograms = ref<IProgram[]>([])
  const allPrograms = ref<IProgram[]>([])
  const installedPrograms = ref<IProgram[]>([])
  const notInstalledPrograms = ref<IProgram[]>([])
  const collectionName = 'programs'

  const init = async() => {
    await getProgramsFromDB()
  }

  const getProgramsFromDB = async (): Promise<void> => {
    const token = sessionStorage.getItem('token')
    if (!token) return

    setAuthToken(token)

    try {
      const response = await axios.get(url)
      const { data, statusText } = response

      if (statusText !== 'OK') return
  
      if (data.programs != undefined) {
        allPrograms.value = data.programs.sort((a: IProgram, b: IProgram,) => a.sortOrder - b.sortOrder)
      }
    } catch (error) {
      console.log("error getting programs from database: ", error)
    }
  }

  const setInstalledPrograms = (programs: string[]): void => {
    if (!programs) return

    const installedSet = new Set(programs)
    installedPrograms.value = allPrograms.value.filter((program) => installedSet.has(program._id))
    notInstalledPrograms.value = allPrograms.value.filter(program => !installedSet.has(program._id))
  }

  const addProgramToActive = (program: IProgram) => {
    if (activePrograms.value.find(x => x._id === program._id) === undefined) {
      program.isActive = true
      activePrograms.value.push(program)
    }
  }

  const removeProgramFromActive = (program: IProgram): void => {
    const index = activePrograms.value.findIndex((p) => p._id === program._id)
    if (index !== -1) {
      activePrograms.value.splice(index, 1)
    }
  }

  const setProgramActiveState = (program: IProgram): void => {
    activePrograms.value.find(x => {
      if(x._id === program._id)
        x.isActive = !x.isActive
    })
  }

  const updateProgram = async(program: IProgram): Promise<void> => {
    const response = await axios.put(url + '/' + program._id, null, { params: program })
    console.log(response)
  }

  const deleteProgram = async(program: IProgram): Promise<void> => {
    const response = await axios.delete(url + '/' + program._id).then(() => getProgramsFromDB())
    console.log(response)
  }

  const createProgram = async(program: IProgram): Promise<void> => {
    const response = axios.post(url, null, { params: program }).then(() => getProgramsFromDB())
    console.log('createReponse', response)
  }

  return {
    activePrograms,
    allPrograms,
    installedPrograms,
    notInstalledPrograms,
    collectionName,
    init,
    getProgramsFromDB,
    setInstalledPrograms,
    addProgramToActive,
    removeProgramFromActive,
    setProgramActiveState,
    updateProgram,
    deleteProgram,
    createProgram
  }
})