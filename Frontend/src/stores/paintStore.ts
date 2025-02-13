import { defineStore } from 'pinia'
import type { IPainting } from '../models/index'
import { get, post } from '@/helpers/httpHelper'

const url = '/paint'

export const paintStore = defineStore('paint', () => {
  const allPaintings = ref<IPainting[]>([])
  const usersPaintings = ref<IPainting[]>([])
  const loadingPaintings = ref<boolean>(false)

  const getAllPaintings = async (): Promise<void> => {
    loadingPaintings.value = true
    const response = await get<IPainting[]>(url)
    allPaintings.value = response
    loadingPaintings.value = false
  }

  const getAllPaintingsByUserId = async (userId: string): Promise<void> => {
    loadingPaintings.value = true
    usersPaintings.value = await get<IPainting[]>(url + '/' + userId)
    loadingPaintings.value = false
  }

  const postPainting = async (painting: IPainting): Promise<void> => {
    await post(url, painting)
  }

  return {
    allPaintings,
    usersPaintings,
    loadingPaintings,
    getAllPaintings,
    getAllPaintingsByUserId,
    postPainting,
  }
})
