import { Program } from '@/models/Program';
import Vue from 'vue';
import { getModule, Module, VuexModule, Action, Mutation } from 'vuex-module-decorators';
import store from './index'

@Module({
  dynamic: true,
  store,
  name: 'programData',
  namespaced: true
})

class ProgramsData extends VuexModule {
  _initialized = false
  _programs: Program[] = []

  // Actions
  @Action({ rawError: true })
  async init () {
    console.log('PROGRAMDATA INITIALIZED')
    this.context.commit('SET_INITIALIZED', true)
  }

  @Action({ rawError: true })
  async SetPrograms(list: Program[]) {
    this.context.commit('SET_PROGRAMS', list)
  }

  @Mutation
  SET_INITIALIZED (val: boolean) {
    this._initialized = val
  }

  @Mutation
  SET_PROGRAMS (list: Program[]) {
    Vue.set(this, '_programs', list)
  }

  // Getters
  get initialized (): boolean {
    return this._initialized
  }

  get programs (): Program[] {
    return this._programs
  }
}

export const ProgramsModule = getModule(ProgramsData)