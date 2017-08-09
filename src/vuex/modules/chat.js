const state = {
  message: '暂无消息'
}

const mutations = {
  setMessage (state, value) {
    state.message = value
  }
}

export default {
  state,
  mutations
}
