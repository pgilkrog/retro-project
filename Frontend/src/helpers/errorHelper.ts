import { useErrorStore } from '@/stores/errorStore'
import type { IErrorItem } from '@/models/index'

const errorstore = useErrorStore()

export default {
  errorHelp(error: string) {
    errorstore.setError(error)
    console.error(error)
  },
}
