import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create the main data store for our app
const store = new Vuex.Store({
  // State
  state: {
    user: undefined,
    characters: undefined,
    characterId: window.localStorage.getItem('characterId'),
    character: undefined,
    gameData: {}
  },

  // Mutations
  mutations: {
    login (state, user) {
      state.user = user
    },

    set_character (state, payload) {
      Vue.set(state.characters, payload.id, payload.character)
    },

    update_characters (state, characters) {
      state.characters = characters
    },

    select_character (state, id) {
      state.characterId = id
      window.localStorage.setItem('characterId', id)
      state.character = state.characters[id]
    },

    update_races (state, races) {
      state.races = races
    },

    update_game_data (state, update) {
      // state.races = races
      Vue.set(state.gameData, update.field, update.data)
    }
  }
})

export default store
