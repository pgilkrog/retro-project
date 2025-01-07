import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const showScreensaver = ref<boolean>(false)
  const screensaverTimer = ref<number>(0)
  const isDev = ref<boolean>(import.meta.env.VITE_IS_DEV as boolean)

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

  const thismaybe = (item: object) => {
    console.log(item)
  }

  return {
    showScreensaver,
    isDev,
    setShowScreensaver,
    initiateScreensaverTimer,
    thismaybe,
  }
})
