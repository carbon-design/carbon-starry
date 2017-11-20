import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import { state, mutations } from './mutations'
import * as actions from './actions'
import getters from './getters'
import channel from './modules/channel'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let plugins = [createPersistedState()]

if (debug && !window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
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
    channel
  },
  strict: debug
})
