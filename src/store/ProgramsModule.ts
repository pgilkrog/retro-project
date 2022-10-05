import { IProgram } from '@/models/IProgram';
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
  _programs: IProgram[] = []

  // Actions
  @Action({ rawError: true })
  async init () {
    console.log('PROGRAMDATA INITIALIZED')
    this.context.commit('SET_INITIALIZED', true)
  }

  @Action({ rawError: true })
  async SetPrograms(list: IProgram[]) {
    this.context.commit('SET_PROGRAMS', list)
  }

  @Mutation
  SET_INITIALIZED (val: boolean) {
    this._initialized = val
  }

  @Mutation
  SET_PROGRAMS (list: IProgram[]) {
    Vue.set(this, '_programs', list)
  }

  // Getters
  get initialized (): boolean {
    return this._initialized
  }

  get programs (): IProgram[] {
    return this._programs
  }
}

export const ProgramsModule = getModule(ProgramsData)