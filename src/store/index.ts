import { createStore, Store, Commit } from 'vuex'
import { type InjectionKey } from 'vue'
import supDawkApiClient from '@/utils/httpClients/supdawkApiClient'
import jwtDecode from 'jwt-decode'

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
    loginUsernameEmail(
      { commit }: { commit: Commit },
      credentials: { email: string; password: string }
    ) {
      return supDawkApiClient
        .post(`/api/v1/authentication/login`, credentials)
        .then((results: any) => {
          const decodedToken: any = jwtDecode(results.accessToken)
          const loggedInUser = {
            name: decodedToken.name,
            email: decodedToken.email
          }
          commit('SET_USER', loggedInUser)
          localStorage.setItem('accessToken', results.accessToken)
          localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
          return
        })
    },
    logout({ commit }: { commit: Commit }) {
      commit('SET_USER', null)
    }
  },
  getters: {
    isLoggedIn: (state: State) => state.user,
    loggedInUser: (state: State) => state.user
  }
})
