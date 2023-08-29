import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import type { IPainting } from '../models/index'
import axios from 'axios'

const url = 'http://localhost:4000/api/paint'

export const paintStore = defineStore("paint", () => {
  const allPaintings = ref<IPainting[]>([])
  const usersPaintings = ref<IPainting[]>([])

  const getAllPaintings = () => {
    axios.get(url).then(data => {
      allPaintings.value = data.data.paintings
    })
  }

  const getAllPaintingsByUserId = async (userId: string) => {
    const response  = await axios.get(url + '/' + userId)
    usersPaintings.value = toRaw(response.data.paintings)
  }

  const postPainting = async (painting: IPainting) => {
    console.log(painting)
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
    getAllPaintings,
    getAllPaintingsByUserId,
    postPainting
  }
})