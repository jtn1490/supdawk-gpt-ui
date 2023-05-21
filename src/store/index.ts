import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'

interface State {
  user: string | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state: State, user: any) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, user: any) {
      // Here you'd call your login API, but for the sake of this example
      // we'll just commit the mutation right away.
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setUser', null)
    }
  },
  getters: {
    // isLoggedIn: (state: State) => !!state.user
    isLoggedIn: (state: State) => true
  },
  modules: {
    // If you have additional modules, put them here.
  }
})
