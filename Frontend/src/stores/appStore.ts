import { defineStore } from "pinia"

export const useAppStore = defineStore('appStore', () => {
  const showScreensaver = ref<boolean>(false)
  const screensaverTimer = ref()
  const isDev = ref<boolean>(import.meta.env.VITE_BASE_URL)

  const initiateScreensaverTimer = () => {
    if (screensaverTimer.value >= 0) {
      setShowScreensaver(false)
      clearTimeout(screensaverTimer.value)
    }
    screensaverTimer.value = setTimeout(() => {
      setShowScreensaver(true)
    }, 80000)
  }

  const setShowScreensaver = (bool: boolean) => {
    showScreensaver.value = bool
  }

  const thismaybe = (item: any) => {
    console.log(item)
  }

  return {
    showScreensaver, 
    setShowScreensaver,
    initiateScreensaverTimer,
    thismaybe,
    isDev
  }
})