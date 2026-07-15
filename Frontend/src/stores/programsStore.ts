import { defineStore } from 'pinia'
import { get, put, post, del } from '@/helpers/httpHelper'
import { userStore } from './userStore'
import type {
  IGridProgram,
  IInstalledProgram,
  IInstalledProgramDB,
  IProgram,
} from '../definitions/interfaces/program/'

const url: string = '/program'

export const programsStore = defineStore('programs', () => {
  const userstore = userStore()

  const activePrograms = ref<IProgram[]>([])
  const allPrograms = ref<IProgram[]>([])
  const installedPrograms = ref<IInstalledProgram[]>([])
  const notInstalledPrograms = ref<IProgram[]>([])
  const positionedList = ref<IInstalledProgram[]>([])

  const programStoreInit = async () => {
    await getProgramsFromDB()
    await setInstalledPrograms()
    generateGridPositions()
  }

  const getProgramsFromDB = async (): Promise<void> => {
    allPrograms.value = await get<IProgram[]>(url)
  }

  const addProgramToActive = (program: IProgram) => {
    const findProgram = activePrograms.value.find(
      (activeProgram) => activeProgram._id === program._id
    )

    if (findProgram == undefined) {
      const newProgram = { ...program, isActive: true, left: 40, top: 40 }
      activePrograms.value.push(newProgram)
    }
  }

  const removeProgramFromActive = (program: IProgram): void => {
    const index = activePrograms.value.findIndex(
      (activeProgram) => activeProgram._id === program._id
    )

    if (index !== -1) {
      activePrograms.value.splice(index, 1)
    }
  }

  const setProgramActiveState = (program: IProgram): void => {
    activePrograms.value.find((activeProgram: IProgram) => {
      if (activeProgram._id === program._id) {
        activeProgram.isActive = !activeProgram.isActive
        return true
      }
    })
  }
  //** Installed Program */
  const setInstalledPrograms = async () => {
    if (userstore.userData == undefined) {
      return
    }

    installedPrograms.value = []
    notInstalledPrograms.value = []

    const programs = await get<IInstalledProgramDB[]>(
      `${url}/installedProgram/${userstore.userData._id}`
    )

    allPrograms.value.forEach((program) => {
      const findProgram = programs.find((pro) => pro.programId === program._id)

      if (findProgram != undefined) {
        installedPrograms.value.push({
          _id: findProgram._id,
          program: program,
          userId: findProgram.userId,
          gridPosition: findProgram.gridPosition,
        })
      } else {
        notInstalledPrograms.value.push(program)
      }
    })
  }

  const createInstalledProgram = async (programId: string) => {
    const gridPos = findAvailableGridPosition()

    await post(`${url}/installedProgram`, {
      programId: programId,
      userId: userstore.userData?._id,
      gridPosition: gridPos,
    })

    await setInstalledPrograms()
    generateGridPositions()
  }

  const deleteInstalledProgram = async (id: string) => {
    const installedProgram = installedPrograms.value.find(
      (program: IInstalledProgram) => program.program?._id === id
    )

    if (installedProgram != undefined) {
      await del(`${url}/installedProgram/${installedProgram._id}`)
      await setInstalledPrograms()
      generateGridPositions()
    }
  }

  const updateInstalledProgram = async (installedProgam: IInstalledProgramDB | undefined) => {
    if (installedProgam != undefined) {
      await put(`${url}/installedProgram/${installedProgam._id}`, installedProgam)
    }
  }

  const generateGridPositions = () => {
    for (let i = 0; i < 99; i++) {
      const positionedEl: IInstalledProgram = {
        _id: '0',
        program: undefined,
        userId: '',
        gridPosition: i,
      }
      positionedList.value.push(positionedEl)
    }

    installedPrograms.value.forEach((element) => {
      positionedList.value[element.gridPosition] = element
    })
  }

  const findAvailableGridPosition = (): number => {
    return (
      positionedList.value.find((installedProgram) => installedProgram.program === undefined)
        ?.gridPosition ?? 0
    )
  }

  const changeInstalledProgramGridPosition = async (gridProgram: IGridProgram) => {
    positionedList.value[gridProgram.gridPosition] = gridProgram.program

    const iProgram = gridProgram.program

    if (iProgram.program === undefined) {
      return
    }

    gridProgram.program.gridPosition = gridProgram.gridPosition

    const installedProgramToUpdate: IInstalledProgramDB = {
      _id: iProgram._id,
      programId: iProgram.program._id,
      gridPosition: gridProgram.gridPosition,
      userId: userstore.userData?._id ?? '',
    }

    await updateInstalledProgram(installedProgramToUpdate)
  }

  const updateProgram = async (program: IProgram): Promise<void> => {
    const updatedProgram: IProgram = await put(url + '/' + program._id, { params: program })
    const index = allPrograms.value.findIndex((p) => p._id === updatedProgram._id)

    if (index !== -1) {
      allPrograms.value[index] = updatedProgram
    }
  }

  const deleteProgram = async (program: IProgram): Promise<void> => {
    await del(url + '/' + program._id)
    const index = allPrograms.value.findIndex((p) => p._id === program._id)

    if (index !== -1) {
      allPrograms.value.splice(index, 1)
    }
  }

  const createProgram = async (program: IProgram): Promise<void> => {
    const newProgram: IProgram = await post(url, program)
    allPrograms.value.push(newProgram)
  }

  return {
    // States
    activePrograms,
    allPrograms,
    installedPrograms,
    notInstalledPrograms,
    positionedList,

    // Actions
    programStoreInit,
    getProgramsFromDB,
    addProgramToActive,
    removeProgramFromActive,
    setProgramActiveState,
    updateProgram,
    deleteProgram,
    createProgram,
    createInstalledProgram,
    deleteInstalledProgram,
    changeInstalledProgramGridPosition,
  }
})
