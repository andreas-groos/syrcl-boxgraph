import Vue from "vue";
import Vuex from "vuex";
import { findIndex } from "lodash";
import shortid from "shortid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedStations: [],
    param: { name: "Temp", value: "H2O_Temp" },
    plot: {
      name: "Box Plot By Station",
      value: "BoxPlotByStation",
      singleStation: false
    },
    errors: [],
    selectedStation: null
  },
  mutations: {
    addStationData(state, payload) {
      const { station, data } = payload;
      state.loadedStations.push({ station, data });
    },
    setParam(state, payload) {
      state.param = payload;
    },
    setPlot(state, payload) {
      console.log("payload", payload);
      state.plot = payload;
    },
    setStation(state, payload) {
      state.selectedStation = payload;
    },
    removeStation(state, payload) {
      let index = findIndex(
        state.loadedStations,
        e => payload.StationID === e.station.StationID
      );
      state.loadedStations.splice(index, 1);
      // TODO: reselect another component automatically
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
