<template>
  <div class="home">
    <BoxPlot :stations="loadedStations" />
    <v-select :options="selectionOptions"
              placeholder="select a monitoring station"
              resetOnOptionsChange
              @input="fetchStationData" />
    <Error :errors="errors"></Error>
  </div>
</template>

<script>
import BoxPlot from "../components/BoxPlot.vue";
import Error from "../components/Error.vue";
import vSelect from "vue-select";

import { GET_STATIONS, GET_STATION_DATA } from "../apollo/queries";
import { mapState } from "vuex";
import find from "lodash/find";

export default {
  name: "home",
  components: { vSelect, BoxPlot, Error },
  data() {
    return {
      stations: [],
      loading: 0
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
    fetchStationData: function(station) {
      console.log("station", station);
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

<style scoped>
ul {
  list-style-type: none;
}
li {
  text-align: left;
}
</style>
