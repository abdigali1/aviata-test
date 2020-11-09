import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flights: [],
    airlines: [],
  },
  getters: {
    getFlights: state => state.flights,
    getAirlines: state => state.airlines
  },
  mutations: {
    setJsonData(state, data) {
      state.airlines['all'] = 'Все'
      state.airlines = { ...state.airlines, ...data.airlines }

      const filteredFlights = data.flights.map(element => {
        return element.itineraries[0][0]
      })
      state.flights = filteredFlights
    }
  },
  actions: {
    readJson ({ commit }) {
      axios.get(' results.json').then(res => {
        commit('setJsonData', res.data)
      })
    }
  }
})
