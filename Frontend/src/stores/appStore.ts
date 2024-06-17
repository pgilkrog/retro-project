import { defineStore } from "pinia";

export const useAppStore = defineStore('appStore', () => {
  const showScreensaver = ref<boolean>(false)
  const screensaverTimer = ref()

  const initiateScreensaverTimer = () => {
    if (screensaverTimer.value >= 0) {
      setShowScreensaver(false)
      clearTimeout(screensaverTimer.value)
    }
    screensaverTimer.value = setTimeout(() => {
      setShowScreensaver(true)
    }, 60000);
  }

  const setShowScreensaver = (bool: boolean) => {
    showScreensaver.value = bool
  }

  return {
    showScreensaver, 
    setShowScreensaver,
    initiateScreensaverTimer
  }
})