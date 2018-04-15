
<template>
  <div>
    <highcharts v-if="plotData && plotData.length > 0"
                :options="graphOptions"></highcharts>
  </div>
</template>

<script>
import graphConfig from "../assets/graphConfig.js";
import { linePlotDataPerStation } from "../utils";
import { mapState } from "vuex";

export default {
  name: "LinePlotByStation",
  data() {
    return {};
  },
  computed: {
    ...mapState(["loadedStations", "param"]),
    graphOptions: function() {
      return {
        ...graphConfig,
        chart: {
          type: "line"
        },
        title: {
          text: this.param.name
        },
        series: [
          {
            name: this.param.name,
            data: this.plotData,
            tooltip: {
              headerFormat: "<em>Station: {point.key}</em><br/>"
            }
          }
        ],
        xAxis: {
          // categories: this.plotData.map(p => p.station.StationName)
          categories: "hilell"
        }
      };
    },
    plotData: function() {
      return linePlotDataPerStation(this.loadedStations, this.param);
    }
  }
};
</script>

<style scoped>
</style>
