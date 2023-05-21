import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import axios from 'axios'
import setAuthToken from "@/helpers/setAuthToken"
import { ref } from "vue"

const url = 'http://localhost:4000/api/program'

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
          tempArray.push({
            id: tempData[program]._id,
            name: tempData[program].name,
            isActive: false,
            image: tempData[program].image,
            color: tempData[program].color,
            displayName: tempData[program].displayName,
            sortOrder: tempData[program].sortOrder,
            type: tempData[program].type
          } as IProgram)
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
      const obj2 = allPrograms.value.find(obj2 => obj1 === obj2.id)
      return obj2 !== undefined
    }).map(obj1 => {
      const obj2 = allPrograms.value.find(obj2 => obj1 === obj2.id)
      return obj2
    })
    
    installedPrograms.value = newArray as IProgram[]

    let notInstalled = [] as IProgram[]
    allPrograms.value.forEach(obj2 => {
      const obj1 = newArray.find(obj1 => obj1?.id === obj2.id)
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
    if (activePrograms.value.find(x => x.id === program.id) === undefined) {
      program.isActive = true
      activePrograms.value.push(program)
    }
  }

  const removeProgramFromActive = (program: IProgram) => {
    setActivePrograms(activePrograms.value.filter(x => x.id !== program.id))
  }

  const setProgramActiveState = (program: IProgram) => {
    activePrograms.value.find(x => {
      if(x.id === program.id)
        x.isActive = !x.isActive
    })
  }

  const updateProgram = async(program: IProgram) => {
    const response = await axios.put(url + '/' + program.id, null, { params: program })
    console.log(response)
  }

  const deleteProgram = async(program: IProgram) => {
    const response = await axios.delete(url + '/' + program.id).finally(() => getProgramsFromDB())
    console.log(response)
  }

  const createProgram = async(program: IProgram) => {
    const response = axios.post(url, null, { params: program }).finally(() => getProgramsFromDB())
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