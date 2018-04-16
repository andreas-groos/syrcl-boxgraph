<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <StationSelector v-if="plot.singleStation"></StationSelector>
        <div class="row">
          <div class="col-sm-2">
            <ParamSelector />
          </div>
          <div class="col-sm-8">
            <v-select :options="selectionOptions"
                      placeholder="select a monitoring station"
                      @input="fetchStationData"
                      v-model="selected" />
            <component :is="plot.value"></component>
            <Error :errors="errors"></Error>
          </div>
          <div class="col-sm-2">
            <PlotSelector />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BoxPlotByStation from "../components/BoxPlotByStation.vue";
import BoxPlotByMonth from "../components/BoxPlotByMonth.vue";
import LinePlotByStation from "../components/LinePlotByStation";
import ParamSelector from "../components/ParamSelector";
import PlotSelector from "../components/PlotSelector";
import StationSelector from "../components/StationSelector";
import Error from "../components/Error.vue";
import vSelect from "vue-select";
// import "../assets/bootstrap.css";

import { GET_STATIONS, GET_STATION_DATA } from "../apollo/queries";
import { mapState } from "vuex";
import find from "lodash/find";

export default {
  name: "home",
  components: {
    vSelect,
    BoxPlotByStation,
    BoxPlotByMonth,
    LinePlotByStation,
    ParamSelector,
    PlotSelector,
    StationSelector,
    Error
  },
  data() {
    return {
      stations: [],
      loading: 0,
      currentPlot: "BoxPlotByStation",
      selected: null
    };
  },

  computed: {
    ...mapState(["loadedStations", "errors", "plot"]),
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
            this.selected = null; //NOTE: resets selection, throws error though I do it like in one of the offical codepen example!
            if (
              find(
                this.loadedStations,
                o => station.value.StationID === o.station.StationID
              )
            ) {
              this.$store.commit("addError", {
                type: "selection",
                msg: `${station.value.StationName} already selected`
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
</style>
