import { getModule, Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import store from './index'

@Module({
  dynamic: true,
  store,
  name: 'userData',
  namespaced: true
})

class UserData extends VuexModule {
  _initialized = false
  isLoggedIn = true;

  // Actions
  @Action({ rawError: true })
  async init () {
    console.log('USERDATA INITIALIZED')
    this.context.commit('SET_INITIALIZED', true)
  }

  @Action({ rawError: true })
  async loginUser () {
    this.context.commit('SET_LOGGEDIN', true)
  }

  @Mutation
  SET_INITIALIZED (val: boolean) {
    this._initialized = val
  }

  @Mutation
  SET_LOGGEDIN (val: boolean) {
    this.isLoggedIn = val
  }

  // Getters
  get initialized (): boolean {
    return this._initialized
  }

  get LoggedIn (): boolean {
    return this.isLoggedIn
  }
}

export const UserModule = getModule(UserData)