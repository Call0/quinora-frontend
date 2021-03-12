import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    questionAnswerData: [],
    allQuestions: [],
    particularQuestion: {},
    categoryList: [],
    searchByQuestionList: [],
    searchByUserList: []
  },
  getters: {
    getQuestionAnswerData (state) {
      return state.questionAnswerData
    },
    getAllQuestions (state) {
      return state.allQuestions
    },
    getParticularQuestion (state) {
      return state.particularQuestion
    },
    getCategoryList (state) {
      return state.categoryList
    },
    getSearchByQuestionList (state) {
      return state.searchByQuestionList
    },
    getSearchByUserList (state) {
      return state.searchByUserList
    }
  },
  mutations: {
    setQuestionAnswerData (state, value) {
      state.questionAnswerData = value
    },
    setAllQuestions (state, value) {
      state.allQuestions = value
    },
    setParticularQuestion (state, value) {
      state.particularQuestion = value
    },
    setCategoryList (state, value) {
      state.categoryList = value
    },
    setSearchByQuestionList (state, value) {
      state.searchByQuestionList = value
    },
    setSearchByUserList (state, value) {
      state.searchByUserList = value
    }
  },
  actions: {
    setQuestionRequestAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.81:8080/',
        url: `question/${localStorage.getItem('username')}/add`,
        data: {
          category: object.category,
          questionTitle: object.questionTitle,
          questionText: object.questionText,
          createdAt: new Date(),
          status: true
        }
      }
      axios(axiosConfig)
        .then((e) => {
          const axiosConfigRe = {
            method: 'post',
            baseURL: 'http://10.177.68.73:8080/',
            url: '/multimedia/imageQuestion',
            data: {
              images: [object.imageData],
              question_ID: e.data.questionId
            }
          }
          axios(axiosConfigRe)
            .then((e) => {
              console.log(e.data)
              alert('Question Posted')
            })
        })
        .catch(e => alert('Not Added'))
    },
    setAnswerRequestAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.81:8080/',
        url: `${localStorage.getItem('username')}/${object.questionId}`,
        data: {
          answerText: object.answerText,
          imgsrc: object.imageData
        }
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          const axiosConfigRe = {
            method: 'post',
            baseURL: 'http://10.177.68.81:8080/',
            url: 'notification/add',
            data: {
              usernameAnswered: localStorage.getItem('username'),
              questionId: object.questionId,
              answerId: e.data.id,
              read: true
            }
          }
          axios(axiosConfigRe)
            .then((e) => console.log(e))
        })
        .catch(e => alert('Answer Not Posted'))
    },
    setQuestionAnswerRequestDataAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.81:8080/',
        url: `${localStorage.getItem('username')}/${object}`
      }
      console.log(object)
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          commit('setQuestionAnswerData', e.data)
          console.log(state.questionAnswerData)
          console.log('ID: ' + object)
          localStorage.setItem('questionId', object)
          router.push('/questionAnswer')
        })
        .catch(e => console.log(e))
    },
    setAnswerCommentAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.81:8080/',
        url: `postComment/${localStorage.getItem('username')}`,
        data: {
          answerId: object.answerId,
          text: object.text,
          date: new Date()
        }
      }
      axios(axiosConfig)
        .then((e) => console.log(e.data))
        .catch(e => console.log(e))
    },
    setSignUpAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.110:808/',
        url: '/users/sign-up',
        data: {
          username: object.username,
          password: object.password
        }
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          router.push('/categories')
        })
        .catch(e => console.log(e))
    },
    setLoginAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.110:808/',
        url: '/login',
        data: {
          username: object.username,
          password: object.password
        }
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          localStorage.setItem('sessionId', e.data.Authorization)
          router.push('/')
        })
        .catch(e => console.log(e))
    },
    setCategoriesAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.116:8081/',
        url: '/user/save',
        data: {
          username: localStorage.getItem('username'),
          category: object,
          email: localStorage.getItem('email')
        }
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          alert('Registeration Successful, Please Login Now')
          router.push('/login')
        })
        .catch(e => console.log(e))
    },
    setLikeAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.81:8080/',
        url: `/reaction/${localStorage.getItem('username')}`,
        data: {
          answerId: object.answerId,
          liked: object.isLiked
        }
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
        })
        .catch(e => console.log(e))
    },
    setDislikeAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'post',
        baseURL: 'http://10.177.68.81:8080/',
        url: `/reaction/${localStorage.getItem('username')}`,
        data: {
          answerId: object.answerId,
          liked: object.isLiked
        }
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
        })
        .catch(e => console.log(e))
    },
    setGetAllQuestionsAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.81:8080/',
        url: '/question/all'
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          commit('setAllQuestions', e.data)
        })
        .catch(e => console.log(e))
    },
    setGetParticularQuestionAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.81:8080/',
        url: `/question/question-id/${object}`
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          commit('setParticularQuestion', e.data)
        })
        .catch(e => console.log(e))
    },
    setGetUserCategoriesAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.116:8081/',
        url: `/user/findByUserName/${localStorage.getItem('username')}`
      }
      axios(axiosConfig)
        .then((e) => {
          localStorage.setItem('categoryList', e.data.category)
          console.log(e.data.category)
          commit('setCategoryList', e.data.category)
        })
        .catch(e => console.log(e))
    },
    setGetQuestionsByCategoryAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.81:8080/',
        url: `/question/${object.category}`
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          commit('setAllQuestions', e.data)
        })
        .catch(e => console.log(e))
    },
    searchByQuestionAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.116:8082/',
        url: `/search/question/${object}`
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          commit('setSearchByQuestionList', e.data)
          router.push('/searchByQuestion')
        })
        .catch(e => console.log(e))
    },
    searchByAnswerAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.116:8082/',
        url: `/search/answer/${object}`
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
        })
        .catch(e => console.log(e))
    },
    searchByUserAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'get',
        baseURL: 'http://10.177.68.116:8082/',
        url: `/search/name/${object}`
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          commit('setSearchByUserList', e.data)
          router.push('/searchByUser')
        })
        .catch(e => console.log(e))
    },
    deleteQuestionAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'put',
        baseURL: 'http://10.177.68.81:8080/',
        url: `question/${localStorage.getItem('username')}/disable/${object}`
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          router.go()
        })
    },
    deleteAnswerAction ({ commit, state }, object) {
      const axiosConfig = {
        method: 'put',
        baseURL: 'http://10.177.68.81:8080/',
        url: `${localStorage.getItem('username')}/${object.qid}/delete`,
        data: {
          answerId: object.ansid
        }
      }
      axios(axiosConfig)
        .then((e) => {
          console.log(e.data)
          router.go()
        })
    }
  }
})
