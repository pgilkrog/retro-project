import { defineStore } from "pinia"
import { setPersistence, browserSessionPersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '@/firebase'


export const userStore = defineStore("user", {
  state: () => ({
    _isLoggedIn: false,
    _user: {},
    auth: auth
  }),
  actions: {
    checkIfUserIsLoggedIn() {
      if(auth.currentUser !== null) {
        this._isLoggedIn = true
        return
      }      
    },
    loginUser(email: string, password: string) {
      if(email != "" && password != "")
        setPersistence(auth, browserSessionPersistence).then(() => {
          signInWithEmailAndPassword(auth, email, password).then((data: any) => {
            console.log(data)
            this._isLoggedIn = true
          })          
        })
        .catch((error: any) => {
          console.log(error)
        })
    },
    registerUser(userName: string, password: string) {
      createUserWithEmailAndPassword(this.auth, userName, password).then((data: any) => {
        console.log(data)
        this._isLoggedIn = true
      })
    }
  },
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn
  }
})