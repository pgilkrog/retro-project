import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const showScreensaver = ref<boolean>(false)
  const screensaverTimer = ref()
  const isDev = ref<boolean>(import.meta.env.VITE_IS_DEV)

  const appInit = () => {}

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
    appInit,
    setShowScreensaver,
    initiateScreensaverTimer,
    thismaybe,
    isDev,
  }
})
