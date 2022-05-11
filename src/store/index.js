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
      let profi = state.choix.profiles.find(item => item.selected === true).selections
      return profi
    },
    getResults(state){
      return state.results
    },
    getProfiles(state){
      return state.choix.profiles
    },


    giveSelection (state) {
      return (id) => {
        for (const profile of state.choix.profiles) {
          for (const selection of profile.selections) {
            if (selection.id === id) {
              return selection
            }
          }
        }
      }
    },
  },


  mutations: {
    SELECT_PROFILE_TO_F(state, profileIndex){
      state.choix.profiles[profileIndex].selected = false
      
    },
    SELECT_PROFILE(state, profileIndex){
      state.choix.profiles[profileIndex].selected = true
            
          },


    REMOVE_PROFILE(state, profileIndex){
      state.choix.profiles.splice(profileIndex, 1)

    },

    CREATE_PROFILE (state, { name }) {
      state.choix.profiles.push({
        name,
        selected:false,
        selections: [{
          name: 'Canton',
          id:1,
      },
      {
          name: 'Commune',
          id:2,
      },
      {
          name: 'Numéro de rue',
          id:3,
      },
      {
          name: 'Nom de rue',
          id:4,
      },]
      })
    },
    MOVE_PROFILE (state, { fromProfileIndex, toProfileIndex }) {
      const profileList = state.choix.profiles

      const profileToMove = profileList.splice(fromProfileIndex, 1)[0]
      profileList.splice(toProfileIndex, 0, profileToMove)
    },

    MOVE_SELECTION (state, { fromSelections, toSelections, fromSelectionIndex, toSelectionIndex }) {
      const selectionToMove = fromSelections.splice(fromSelectionIndex, 1)[0]
      toSelections.splice(toSelectionIndex, 0, selectionToMove)
    },

    REMOVE_SELECTION(state, selectionIndex){
      state.choix.profiles.find(item => item.selected === true).selections.splice(selectionIndex, 1)

    },

    ADD_SELECTION(state, payload) {
      console.log("that is the payload", payload)
      //console.log("that is the selection",state.choix.profiles[profileIndexSelected].selections)
      //state.choix.profiles[profileIndexSelected].selections.push(payload)

      console.log("selected the selection where add",state.choix.profiles.find(item => item.selected === true).selections)

      //choix.profiles[profileIndexSelected].selections.splice(0, 0, payload)
      state.choix.profiles.find(item => item.selected === true).selections.splice(0, 0, payload)

    },

    setResults(state,payload){
      state.results = payload    
    },

    INITIALIZE_CHOIX(state,payload){
      state.choix = payload
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
