import { addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default {
  async getAll(colName: string) {
    try {
      let array: any[] = []
      const data = await getDocs(collection(db, colName))
      data.forEach(doc => {
        array = [...array, {
          ...doc.data(),
          Id: doc.id
        }]
      })
      return array
    } catch (error) {
      console.error(error)
    }
  },
  async getOneById(collectionName: string, id: string) {
    try {
      const docRef = doc(db, collectionName, id)
      const data = await getDoc(docRef)
      return data.data()
    } catch (error) {
      console.error(error)
    }
  },
  async create(collectionName: string, item: any) {
    try {
      await addDoc(collection(db, collectionName), item)
    } catch (error) {
      console.error(error)
    }
  },
  async update(collectionName: string, toUpdate: any) {
    try {
      const docRef = doc(db, collectionName, toUpdate.id)
      await updateDoc(docRef, toUpdate)
    } catch (error) {
      console.error(error)
    }
  },
  async delete(collectionName: string, id: string) {
    try {
      await deleteDoc(doc(db, collectionName, id))
    } catch (error) {
      console.error(error)
    }
  }
}