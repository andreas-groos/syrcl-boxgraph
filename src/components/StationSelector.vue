
<template>
  <div class="row my-2">
    <div class="col">
      <div class="d-flex justify-content-center flex-wrap">
        <div v-for="station in stations"
             class="station-wrapper"
             :key="station.station.StationID">
          <div>

            <button type="button"
                    @click="handleClick(station.station)"
                    class="btn btn-block btn-outline-primary">
              {{station.station.StationName}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StationSelector",
  data() {
    return {};
  },
  computed: {
    ...mapState({ stations: "loadedStations" })
  },
  methods: {
    handleClick: function(value) {
      this.$store.commit("setStation", value);
    }
  }
};
</script>

<style scoped>
.station-wrapper {
  /* margin: 5px 10px; */
  width: 25%;
}

.station-wrapper div {
  margin: 5px 10px;
}

.station-wrapper div button {
  text-align: center;
  font-size: 0.8rem;
  overflow: hidden;
}
</style>
