import { createStore } from 'vuex'

export default createStore({
  state: {
    answerList: {},
    actualAnswer: {}
  },
  mutations: {
    setAnswerList: (state, data) => {
      state.answerList = data
    },
    setActualAnswer: (state, data) => {
      state.actualAnswer = data
    }
  },
  actions: {
  },
  modules: {
  }
})
