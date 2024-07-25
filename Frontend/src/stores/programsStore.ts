import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import { ref } from "vue"
import { get, put, post, del } from '@/helpers/httpHelper'
import { userStore } from "./userStore"

const url = import.meta.env.VITE_BASE_URL + '/program'

export const programsStore = defineStore("programs", () => {
  const activePrograms = ref<IProgram[]>([])
  const allPrograms = ref<IProgram[]>([])
  const installedPrograms = ref<IProgram[]>([])
  const notInstalledPrograms = ref<IProgram[]>([])
  const userstore = userStore()

  const init = async() => {
    await getProgramsFromDB()
  }

  const getProgramsFromDB = async (): Promise<void> => {
    allPrograms.value = await get<IProgram[]>(url)
  }

  const setInstalledPrograms = (programs: string[]): void => {
    if (!programs || !allPrograms.value.length) return

    const installedSet = new Set(programs)
    installedPrograms.value = allPrograms.value.filter((program) => installedSet.has(program._id))
    notInstalledPrograms.value = allPrograms.value.filter(program => !installedSet.has(program._id))
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



  const getInstalledPrograms = async () => {
    const trydis = await get(url + '/installedProgram/' + userstore.userData?._id)
  }

  const createInstalledProgram = async (programId: any, gridPosition: number) => {
    const newObject = {
      programId: programId, userId: userstore.userData?._id, gridPosition: gridPosition
    }

    await post(url + '/installedProgram', { params: { programId: programId, userId: userstore.userData?._id, gridPosition: gridPosition }}).then(() => {})
  }

  return {
    activePrograms,
    allPrograms,
    installedPrograms,
    notInstalledPrograms,
    init,
    getProgramsFromDB,
    setInstalledPrograms,
    addProgramToActive,
    removeProgramFromActive,
    setProgramActiveState,
    updateProgram,
    deleteProgram,
    createProgram,
    createInstalledProgram,
    getInstalledPrograms
  }
})