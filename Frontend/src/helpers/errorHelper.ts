import { useErrorStore } from '@/stores/errorStore'

const errorstore = useErrorStore()

export default {
  errorHelp(error: string) {
    errorstore.setError(error)
    console.error(error)
  },
}
