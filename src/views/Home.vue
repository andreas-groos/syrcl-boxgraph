<template>
  <div class="home">
    <v-select :options="selectionOptions"
              placeholder="select a monitoring station"
              resetOnOptionsChange
              @input="fetchStationData" />

  </div>
</template>

<script>
import { GET_STATIONS, GET_STATION_DATA } from "../apollo/queries";
import vSelect from "vue-select";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {},
  data() {
    return {
      stations: [],
      loading: 0
    };
  },
  computed: {
    ...mapGetters(["loadedStations"]),
    selectionOptions: function() {
      return this.stations.map(s => {
        return { label: s.StationName, value: s.StationID };
      });
    }
  },
  methods: {
    fetchStationData: function(station) {
      const id = station.value;
      if (!this.loadedStations[id]) {
        this.$apollo
          .query({
            query: GET_STATION_DATA,
            variables: {
              station: id
            }
          })
          .then(res => {
            this.$store.commit("addStationData", {
              id,
              data: res.data.sitevisits
            });
          });
      }
    }
  },
  apollo: {
    stations: {
      query: GET_STATIONS
    }
  },
  components: { vSelect }
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
