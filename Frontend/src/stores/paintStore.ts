import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import type { IPainting } from '../models/index'
import axios from 'axios'
import { get } from '@/helpers/httpHelper'

const url = import.meta.env.VITE_BASE_URL + '/paint'

export const paintStore = defineStore("paint", () => {
  const allPaintings = ref<IPainting[]>([])
  const usersPaintings = ref<IPainting[]>([])
  const loadingPaintings = ref<boolean>(false)

  const getAllPaintings = (): void => {
    loadingPaintings.value = true
    axios.get(url)
      .then(data => {
        allPaintings.value = toRaw(data.data.paintings)
      })     
      .catch((error: any) => {
        console.log(error)
      })
      .finally(() => {
        loadingPaintings.value = false
      })
  }

  const getAllPaintingsByUserId = async (userId: string): Promise<void> => {
    loadingPaintings.value = true
    usersPaintings.value = await get<IPainting[]>(url + '/' + userId)
    loadingPaintings.value = false
  }

  const postPainting = async (painting: IPainting): Promise<void> => {
    try {
      await axios.post(url, painting, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    allPaintings,
    usersPaintings,
    loadingPaintings,
    getAllPaintings,
    getAllPaintingsByUserId,
    postPainting
  }
})