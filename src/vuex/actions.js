export const login = ({ commit }, value) => {
  commit('login', value)
}

export const logout = ({ commit }) => {
  commit('logout')
}

export const setMessage = ({ commit }, value) => {
  commit('setMessage', value)
}
