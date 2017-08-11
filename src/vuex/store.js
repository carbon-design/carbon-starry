import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { state, mutations } from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import chat from './modules/chat'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let plugins = []

if (debug) {
  const logger = createLogger({
    collapsed: false,
    transformer (state) {
      return state
    },
    mutationTransformer (mutation) {
      return mutation
    }
  })
  plugins = [logger]
}

export default new Vuex.Store({
  plugins,
  state,
  mutations,
  getters,
  actions,
  modules: {
    chat
  },
  strict: debug
})
