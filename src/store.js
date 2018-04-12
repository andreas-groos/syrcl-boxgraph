import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedStations: {}
  },
  mutations: {
    addStationData(state, payload) {
      const { id, data } = payload;
      state.loadedStations = { ...state.loadedStations, [id]: data }; // NOTE: imutable !
    }
  },
  getters: {
    loadedStations: state => state.loadedStations
  },
  actions: {}
});
