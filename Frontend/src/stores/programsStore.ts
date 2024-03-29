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

  const getProgramsFromDB = async () => {
    try {
      setAuthToken(sessionStorage.getItem('token') as string)
      await axios.get(url).then((data: any) => {
        let tempData = data.data.programs
        let tempArray: IProgram[] = []
        for(const program in tempData) {
          tempArray.push(tempData[program] as IProgram)
        }
        allPrograms.value = tempArray.sort((a: IProgram, b: IProgram,) => a.sortOrder - b.sortOrder)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const setInstalledPrograms = (programs: string[]) => {
    if(programs === undefined)
      return

    const newArray = programs.filter(obj1 => {
      const obj2 = allPrograms.value.find(obj2 => obj1 === obj2._id)
      return obj2 !== undefined
    }).map(obj1 => {
      const obj2 = allPrograms.value.find(obj2 => obj1 === obj2._id)
      return obj2
    })
    
    installedPrograms.value = newArray as IProgram[]

    let notInstalled = [] as IProgram[]
    allPrograms.value.forEach(obj2 => {
      const obj1 = newArray.find(obj1 => obj1?._id === obj2._id)
      if (!obj1) {
        notInstalled.push(obj2)
      }
    })
    notInstalledPrograms.value = notInstalled
    console.log(programs)
  }

  const setActivePrograms = (programs: IProgram[]) => {
    activePrograms.value = programs
  }

  const addProgramToActive = (program: IProgram) => {
    if (activePrograms.value.find(x => x._id === program._id) === undefined) {
      program.isActive = true
      activePrograms.value.push(program)
    }
  }

  const removeProgramFromActive = (program: IProgram) => {
    setActivePrograms(activePrograms.value.filter(x => x._id !== program._id))
  }

  const setProgramActiveState = (program: IProgram) => {
    activePrograms.value.find(x => {
      if(x._id === program._id)
        x.isActive = !x.isActive
    })
  }

  const updateProgram = async(program: IProgram) => {
    const response = await axios.put(url + '/' + program._id, null, { params: program })
    console.log(response)
  }

  const deleteProgram = async(program: IProgram) => {
    const response = await axios.delete(url + '/' + program._id).then(() => getProgramsFromDB())
    console.log(response)
  }

  const createProgram = async(program: IProgram) => {
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