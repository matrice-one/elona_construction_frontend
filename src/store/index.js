import { createStore } from 'vuex'
import defaultSelection from '@/default-selection.js'
import referenceSelection from '@/reference-selection.js'
import { saveStatePlugin, uuid } from '@/utils.js'

const choix = JSON.parse(localStorage.getItem('choix')) || defaultSelection
const reference = JSON.parse(localStorage.getItem('reference')) || referenceSelection

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    results: '',
    isLoading:false,
    choix,
    reference,
    
  
  },
  getters: {
    getSelection (state) {
      return state.choix.profiles[0].selections
    },
    getResults(state){
      return state.results
    }
  },

  mutations: {
    setResults(state,payload){
      state.results = payload    
    },

    initializeStore(state){
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
    } else {
        state.token = ''
        state.isAuthenticated = false
    }
    },


    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
  },  
  removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
  },
  setIsLoading(state,status){
    state.isLoading = status
  },
  },

  actions: {
  },
  modules: {
  },

})
