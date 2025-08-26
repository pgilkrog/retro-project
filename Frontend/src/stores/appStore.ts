import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const showScreensaver = ref<boolean>(false)
  const screensaverTimer = ref<number>(0)
  const isDev = ref<boolean>(import.meta.env.VITE_IS_DEV as boolean)

  const myList = [
    {
      name: 'asdfgæk',
      method: () => {
        thismehtod2()
      },
      icon: 'fa-house',
    },
    {
      name: 'sdfælkj',
      method: () => {
        thismethod()
      },
      icon: 'fa-house',
    },
    {
      name: 'check',
      icon: 'fa-house',
      method: (item: object) => {
        thismaybe(item)
      },
    },
    {
      name: 'no method',
      icon: 'fa-house',
    },
  ]

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
    console.log('thismaybe', item)
  }

  const thismethod = () => {
    console.log('thismethod')
  }

  const thismehtod2 = () => {
    console.log('thismehtod2')
  }

  return {
    showScreensaver,
    isDev,
    myList,
    setShowScreensaver,
    initiateScreensaverTimer,
    thismaybe,
  }
})
