import { getLessons } from '~/config/api'
import { indicator } from '~/plugins/indicator'

export const login = ({ commit }, value) => {
  commit('login', value)
}

export const logout = ({ commit }) => {
  commit('logout')
}

export const setLessonList = ({ commit }, value) => {
  commit('setLessonList', value)
}

export const getLessonList = async handle => {
  indicator.open('正在加载...')
  const resLesson = await getLessons()
  indicator.close()
  setLessonList(handle, resLesson.data.lessonData)
}
