import Vue from "vue";
import Vuex from "vuex";
import { find, findIndex } from "lodash";
import shortid from "shortid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedStations: [],
    errors: []
  },
  mutations: {
    addStationData(state, payload) {
      const { station, data } = payload;
      state.loadedStations.push({ station, data });
    },
    addError(state, payload) {
      const { type, msg } = payload;
      state.errors.push({ type, msg, id: shortid.generate() });
    },
    removeError(state, payload) {
      let index = findIndex(state.errors, e => payload.id === e.id);
      state.errors.splice(index, 1);
    }
  },
  getters: {
    quartiles: state => state.loadedStations
  },
  actions: {}
});
