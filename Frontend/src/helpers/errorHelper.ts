import { errorStore } from '@/stores/errorStore'
import type { IErrorItem } from '@/models/index'

const errorstore = errorStore()

export default {
  errorHelp(error: string) {
    errorstore.setError(error) 
    console.error(error)
  }
}