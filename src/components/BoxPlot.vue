<template>
  <div>
    <highcharts v-if="plotData && plotData.length > 0"
                :options="graphOptions"></highcharts>
  </div>
</template>

<script>
import graphConfig from "../assets/graphConfig.js";
import { boxPlotData } from "../utils";

export default {
  name: "BoxPlot",
  props: ["stations"],
  data() {
    return {};
  },
  computed: {
    graphOptions: function() {
      return {
        ...graphConfig,
        series: [
          {
            name: "Measurments",
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
      return boxPlotData(this.stations);
    }
  }
};
</script>

<style>
</style>
