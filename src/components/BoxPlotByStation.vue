<template>
  <div>
    <highcharts v-if="plotData && plotData.length > 0"
                :options="graphOptions"></highcharts>
  </div>
</template>

<script>
import graphConfig from "../assets/graphConfig.js";
import { boxPlotDataPerStation } from "../utils";
import { mapState } from "vuex";

export default {
  name: "BoxPlot",
  data() {
    return {};
  },
  computed: {
    ...mapState(["loadedStations", "param"]),
    graphOptions: function() {
      return {
        ...graphConfig,
        title: {
          text: this.param.name
        },
        series: [
          {
            name: this.param.name,
            data: this.plotData.map(p => p.data),
            tooltip: {
              headerFormat: "<em>Station: {point.key}</em><br/>"
            }
          }
        ],
        xAxis: {
          categories: this.plotData.map(p => p.station.StationName)
        }
      };
    },
    plotData: function() {
      return boxPlotDataPerStation(this.loadedStations, this.param);
    }
  }
};
</script>

<style scoped>
</style>
