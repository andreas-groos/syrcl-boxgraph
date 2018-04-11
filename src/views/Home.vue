<template>
  <div class="home">
    <ul>
      <li v-for="station in stations"
          @click="load(station.StationID)"
          :key="station.StationName">{{station.StationName}}</li>
    </ul>
  </div>
</template>

<script>
import { GET_STATIONS, GET_STATION_DATA } from "../apollo/queries";

export default {
  name: "home",
  components: {},
  data() {
    return {
      stations: [],
      loading: 0,
      test: null,
      riverData: [] // needs to be set in data() to get apollo data
    };
  },
  methods: {
    load: function(id) {
      console.log(id);
      this.$apollo
        .query({
          query: GET_STATION_DATA,
          variables: {
            station: id
          }
        })
        .then(res => {
          this.riverData.push(res.data.sitevisits);
        });
    }
  },
  apollo: {
    stations: {
      query: GET_STATIONS
    }
    // river: {
    //   query: GET_STATION_DATA,
    //   variables: { station: 19 }
    // }
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
