import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  async getAll(colName: string) {
    try {
      const data = await getDocs(collection(db, colName))
      return data.docs.map(doc => doc.data())
    } catch (error) {
      console.error(error)
    }
  },
  async getOneById(collectionName: string, id: string) {
    try {
      const data = await getDocs(collection(db, collectionName))
      let array: any

      data.forEach((doc: any) => {
        if(doc !== undefined && doc.data().id === id)
          array = doc.data()
      })

      return array
    } catch (error) {
      console.error(error)
    }
  },
  async create(collectionName: string, item: any) {
    try {
      const docRef = await addDoc(collection(db, collectionName), item)
    } catch (error) {
      console.error(error)
    }

  },
  update(collectionName: string, id: string, toUpdate: any) {
    try {
      
    } catch (error) {
      console.error(error)
    }
  },
  delete(collectionName: string, id: string) {
    try {
      
    } catch (error) {
      console.error(error)
    }
  }
}