import { defineStore } from "pinia"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from '@/firebase'


export const userStore = defineStore("user", {
  state: () => ({
    _isLoggedIn: false,
    _user: {},
  }),
  actions: {
    checkIfUserIsLoggedIn() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("USER", user)
          this._isLoggedIn = true
          this._user = user
        }
      })  
    },
    loginUser(email: string, password: string) {
      if(email != "" && password != "")
        signInWithEmailAndPassword(auth, email, password).then((data: any) => {
          console.log(data)
          this._isLoggedIn = true
          this._user = data
        })          
    },
    registerUser(userName: string, password: string) {
      createUserWithEmailAndPassword(auth, userName, password).then((data: any) => {
        console.log(data)
        this._isLoggedIn = true
      })
    },
    signOut() {
      signOut(auth)
      this._isLoggedIn = false
      this._user = {}
    }
  },
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn,
    getUser: (state) => state._user
  }
})