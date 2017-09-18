export const login = ({ commit }, value) => {
  commit('login', value)
}

export const logout = ({ commit }) => {
  commit('logout')
}

export const setLessonList = ({ commit }, value) => {
  commit('setLessonList', value)
}
