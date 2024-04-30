import { defineStore } from "pinia"
import type { IProgram } from '@/models/index'
import { ref } from "vue"
import { get, put, post, del } from '@/helpers/httpHelper'

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
    const unsortedPrograms = await get<IProgram[]>(url)
    allPrograms.value = unsortedPrograms.sort((a: IProgram, b: IProgram,) => a.sortOrder - b.sortOrder)
  }

  const setInstalledPrograms = (programs: string[]): void => {
    if (!programs || !allPrograms.value.length) return

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

  const updateProgram = async (program: IProgram): Promise<void> => {
    await put(url + '/' + program._id, program)
  }

  const deleteProgram = async (program: IProgram): Promise<void> => {
    await del(url + '/' + program._id).then(() => getProgramsFromDB())
  }

  const createProgram = async (program: IProgram): Promise<void> => {
    await post(url, { params: program }).then(() => getProgramsFromDB())
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