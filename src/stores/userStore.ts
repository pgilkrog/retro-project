import { defineStore } from "pinia"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword
} from "firebase/auth"
import { auth } from '@/firebase'
import { errorStore } from "./errorStore"
import type { FirebaseError } from "firebase/app"
import type { User } from "firebase/auth"
import type { IFile, IUser } from "@/models"
import DBHelper from "@/helpers/DBHelper"
import { toRaw } from 'vue'

export const userStore = defineStore("user", {
  state: () => ({
    _isLoggedIn: false,
    _user: {} as User,
    _userData: {} as IUser,
    _checkedAuth: false,
    errorstore: errorStore(),
    _backgroundImages: [] as IFile[]
  }),
  getters: {
    getIsLoggedIn: (state) => state._isLoggedIn,
    getUser: (state) => state._user,
    getUserData: (state) => toRaw(state._userData),
    getCheckedAuth: (state) => state._checkedAuth,
    getUserBackgroundImages: (state) => toRaw(state._backgroundImages)
  },
  actions: {
    async init() {
      await this.checkIfUserIsLoggedIn()
    },
    async checkIfUserIsLoggedIn() {
      onAuthStateChanged(auth, (user) => {
        this._isLoggedIn = Boolean(user)
        this._user = user || {} as User
        
        if (user !== undefined && user !== null)
          DBHelper.getOneByUserId('users', user.uid).then((userData) => {
            this._userData = userData as IUser
            this._backgroundImages = userData.Files.filter((file: IFile) => file.Type === 'BackgroundImage')
        })
        this._checkedAuth = true
      })
    },
    async loginUser(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then((data: any) => {
          this._isLoggedIn = true
          this._user = data as User
        })
        .catch((error: FirebaseError) => {
          this.errorstore.setError({
            show: true,
            text: error.message,
            icon: '', 
            timeStamp: new Date()
          })
        })
    },
    async registerUser(userName: string, password: string) {
      createUserWithEmailAndPassword(auth, userName, password)
        .then((data: any) => {
          this._isLoggedIn = true
        })        
        .catch((error: FirebaseError) => {
          this.errorstore.setError({
            show: true,
            text: error.message,
            icon: '',
            timeStamp: new Date()
          })
        })
    },
    async signOut() {
      signOut(auth)
      this._isLoggedIn = false
      this._user = {} as User
    },
    async changePassword(password: string) {
      updatePassword(this.getUser, password)
    },
  }
})