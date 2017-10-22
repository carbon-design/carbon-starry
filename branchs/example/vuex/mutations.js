export const state = {
  loginState: false,
  userInfo: {}
}

export const mutations = {
  login (state, val) {
    state.loginState = true
    state.userInfo = val
  },

  logout (state, val) {
    state.loginState = false
    state.userInfo = {}
  }
}
