<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="plot-style">
          <h4 @click="switchPlot('BoxPlot')"
              :class="{active: currentPlot === 'BoxPlot'}">stations</h4>
          <h4 @click="switchPlot(
          'BoxPlot2')"
              :class="{active:
          currentPlot === 'BoxPlot2'}">months</h4>
        </div>
        <StationSelector v-if="currentPlot==='BoxPlot2'"></StationSelector>
        <div class="row">
          <div class="col-sm-2">
            <ParamSelector />
          </div>
          <div class="col-sm-10">
            <v-select :options="selectionOptions"
                      placeholder="select a monitoring station"
                      resetOnOptionsChange
                      @input="fetchStationData" />
            <component :is="currentPlot"></component>
            <Error :errors="errors"></Error>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoxPlot from "../components/BoxPlot.vue";
import BoxPlot2 from "../components/BoxPlot2.vue";
import ParamSelector from "../components/ParamSelector";
import StationSelector from "../components/StationSelector";
import Error from "../components/Error.vue";
import vSelect from "vue-select";
import "../assets/bootstrap.css";

import { GET_STATIONS, GET_STATION_DATA } from "../apollo/queries";
import { mapState } from "vuex";
import find from "lodash/find";

export default {
  name: "home",
  components: {
    vSelect,
    BoxPlot,
    BoxPlot2,
    ParamSelector,
    StationSelector,
    Error
  },
  data() {
    return {
      stations: [],
      loading: 0,
      currentPlot: "BoxPlot"
    };
  },

  computed: {
    ...mapState(["loadedStations", "errors"]),
    selectionOptions: function() {
      return this.stations.map(s => {
        return {
          label: s.StationName,
          value: s
        };
      });
    }
  },
  methods: {
    switchPlot: function(style) {
      this.currentPlot = style;
      // eslint-disable-next-line
      console.log("this.currentPlot", this.currentPlot);
    },
    fetchStationData: function(station) {
      const id = station.value.StationID;
      if (!this.loadedStations[id]) {
        this.$apollo
          .query({
            query: GET_STATION_DATA,
            variables: {
              station: id
            }
          })
          .then(res => {
            if (
              find(
                this.loadedStations,
                o => station.value.StationID === o.station.StationID
              )
            ) {
              this.$store.commit("addError", {
                type: "selection",
                msg: "station already selected"
              });
            } else {
              this.$store.commit("addStationData", {
                station: station.value,
                data: res.data.sitevisits
              });
              this.$store.commit("setStation", station.value);
            }
          });
      }
    }
  },
  apollo: {
    stations: {
      query: GET_STATIONS // Initial data fetch of all stations...
    }
  }
};
</script>

<style lang="scss"  scoped>
.plot-style {
  display: flex;
  justify-content: center;
  & > h4 {
    padding: 10px 30px;
    margin: 5px 10px;
  }
}
.active {
  color: #42b983;
  text-decoration: underline;
}
</style>
