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
  async getAllByUserId(colName:string, userId: string) {
    try {
      let array: any[] = []
      const data = await getDocs(collection(db, colName))
      data.forEach(doc => {
        if (doc.data().UId === userId)
          array = [...array, {
            ...doc.data(),
            Id: doc.id
          }]
      })
      return array
    } catch (error) {
      console.log(error)
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
  async getOneByUserId(colName: string, id: string) {
    try {
      let array: any[] = []
      const data = await getDocs(collection(db, colName))
      data.forEach(doc => {
        if (doc.data().UId === id)
          array = [...array, {
            ...doc.data(),
            Id: doc.id
          }]
      })
      return array[0]
    } catch (error) {
      console.error(error)
    }
  },
  
  async create(collectionName: string, item: any) {
    try {
      await addDoc(collection(db, collectionName),  JSON.parse(JSON.stringify(item)))
    } catch (error) {
      console.error(error)
    }
  },
  async update(collectionName: string, toUpdate: any) {
    try {
      const docRef = doc(db, collectionName, toUpdate.Id)
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