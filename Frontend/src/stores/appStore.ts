import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const showScreensaver = ref<boolean>(false)
  const screensaverTimer = ref<number>(0)
  const isDev = ref<boolean>(import.meta.env.VITE_IS_DEV as boolean)

  const icons = import.meta.glob('@/assets/icons/*', { eager: true, import: 'default' })

  const getIcon = (image: string) => {
    const found = icons[`/src/assets/icons/${image}.png`]

    return typeof found === 'string' ? found : (icons['/src/assets/icons/retropcicon.png'] as string)
  }

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

  return {
    // States
    showScreensaver,
    isDev,
    icons,

    // Actions
    setShowScreensaver,
    initiateScreensaverTimer,
    getIcon
  }
})
