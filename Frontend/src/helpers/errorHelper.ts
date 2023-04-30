import DBHelper from './DBHelper'
import { errorStore } from '@/stores/errorStore'
import type { IErrorItem } from '@/models/index'

const errorstore = errorStore()

export default {
  errorHelp(error: string) {
    DBHelper.create('errorLog', error)
    errorstore.setError({text: error, show: true, icon: ''} as IErrorItem) 
    console.error(error)
  }
}