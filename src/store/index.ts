import { createStore, Store, Commit } from 'vuex'
import { type InjectionKey } from 'vue'
import supDawkApiClient from '@/utils/httpClients/supdawkApiClient'

interface User {
  firstName: string
  lastName: string
  email: string
}

interface State {
  user: User
  authToken: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore<State>({
  state: {
    user: {
      email: '',
      firstName: '',
      lastName: ''
    },
    authToken: ''
  },
  mutations: {
    SET_USER(state: State, user: any) {
      state.user = user
    },
    SET_AUTH_TOKEN(state: State, token: string) {
      state.authToken = token
    }
  },
  actions: {
    login({ commit }: { commit: Commit }, credentials: { email: string; password: string }) {
      commit('setUser')
    },
    logout({ commit }: { commit: Commit }) {
      commit('setUser')
    }
  },
  getters: {
    isLoggedIn: (state: State) => false
  }
})
