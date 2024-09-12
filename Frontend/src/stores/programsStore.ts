import { defineStore } from "pinia"
import { get, put, post, del } from '@/helpers/httpHelper'
import { userStore } from "./userStore"
import type { IInstalledProgram, IInstalledProgramDB, IProgram } from "../models/IProgram"

const url = import.meta.env.VITE_BASE_URL + '/program'

export const programsStore = defineStore("programs", () => {
  const userstore = userStore()
  
  const activePrograms = ref<IProgram[]>([])
  const allPrograms = ref<IProgram[]>([])
  const installedPrograms = ref<IInstalledProgram[]>([])
  const notInstalledPrograms = ref<IProgram[]>([])
  const positionedList = ref<IInstalledProgram[]>([])

  const init = async() => {
    await getProgramsFromDB()
  }

  const getProgramsFromDB = async (): Promise<void> => {
    allPrograms.value = await get<IProgram[]>(url)
  }

  const addProgramToActive = (program: IProgram) => {
    const newProgram = { ...program, isActive: true, left: 40, top: 40 }; // Create a copy
    if (!activePrograms.value.find(x => x._id === newProgram._id)) {
      activePrograms.value.push(newProgram);
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

  const updateProgram = async (program: IProgram): Promise<void> => {
    await put(url + '/' + program._id, { params: program }).then(() => getProgramsFromDB())
  }

  const deleteProgram = async (program: IProgram): Promise<void> => {
    await del(url + '/' + program._id).then(() => getProgramsFromDB())
  }

  const createProgram = async (program: IProgram): Promise<void> => {
    await post(url, { params: program }).then(() => getProgramsFromDB())
  }

  //** Installed Program */
  const setInstalledPrograms = async () => {
    installedPrograms.value = []
    notInstalledPrograms.value = []
    const programs = await get<IInstalledProgramDB[]>(url + '/installedProgram/' + userstore.userData?._id)

    allPrograms.value.forEach(program => {
      const findProgram = programs.find(pro => pro.programId === program._id)
      if (findProgram !== undefined) {
        installedPrograms.value.push({
          _id: findProgram._id,
          program: program,
          userId: findProgram.userId,
          gridPosition: findProgram.gridPosition
        })
      } else {
        notInstalledPrograms.value.push(program)
      }
    })
  }

  const createInstalledProgram = async (programId: any) => {
    const gridPos = findAvailableGridPosition()
    await post(url + '/installedProgram', { params: { programId: programId, userId: userstore.userData?._id, gridPosition: gridPos }}).then(() => {})
    await setInstalledPrograms()
    await generateGridPositions()
  }

  const deleteInstalledProgram = async (id: string) => {
    await del(url + '/installedProgram/' + id)
    await setInstalledPrograms()
    await generateGridPositions()
  }

  const updateInstalledProgram = async (installedProgam: IInstalledProgramDB) => {
    await put(url + '/installedProgram/' + installedProgam._id, { params: installedProgam }).then(() => getProgramsFromDB())
  }

  const generateGridPositions = () => {
    for(let i = 0; i < 99; i++) {
      positionedList.value.push({
        program: undefined,
        userId: '',
        gridPosition: i
      } as IInstalledProgram)
    }
    
    installedPrograms.value.forEach(element => {
      positionedList.value[element.gridPosition] = element
    })
  }

  const findAvailableGridPosition = (): number => {
    return positionedList.value.find(installedProgram => installedProgram.program === undefined)?.gridPosition ?? 0
  }

  return {
    activePrograms,
    allPrograms,
    installedPrograms,
    notInstalledPrograms,
    init,
    getProgramsFromDB,
    addProgramToActive,
    removeProgramFromActive,
    setProgramActiveState,
    updateProgram,
    deleteProgram,
    createProgram,
    createInstalledProgram,
    setInstalledPrograms,
    updateInstalledProgram,
    deleteInstalledProgram,
    positionedList,
    generateGridPositions
  }
})