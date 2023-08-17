import { defineStore } from 'pinia'
import { ref } from 'vue'
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

  const getAllPaintingsByUserId = (userId: string) => {
    axios.get(url + '/' + userId).then(data => {
      usersPaintings.value = data.data.paintings
    })
  }

  const postPainting = (painting: IPainting) => {
    console.log(painting)
    axios.post(url, {
      name: painting.name,
      canvas: painting.canvas,
      uId: painting.uId
    })
  }

  return {
    allPaintings,
    usersPaintings,
    getAllPaintingsByUserId,
    postPainting
  }
})