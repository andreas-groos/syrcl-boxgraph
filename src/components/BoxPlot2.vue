<template>
  <div>
    <highcharts v-if="plotData && plotData.length > 0"
                :options="graphOptions"></highcharts>
  </div>
</template>

<script>
import graphConfig from "../assets/graphConfig.js";
import { boxPlotDataPerMonth, get5 } from "../utils";
import { mapState } from "vuex";

export default {
  name: "BoxPlot2",
  data() {
    return {};
  },
  computed: {
    ...mapState(["loadedStations"]),
    graphOptions: function() {
      return {
        ...graphConfig,
        title: {
          text: "per month"
        },
        series: [
          {
            name: "Measurments",
            data: this.plotData.map(p => {
              return get5(p);
            }),
            tooltip: {
              headerFormat: "<em>Station: {point.key}</em><br/>"
            }
          }
        ],
        xAxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        }
      };
    },
    plotData: function() {
      return boxPlotDataPerMonth(
        this.loadedStations[this.loadedStations.length - 1]
      );
    }
  }
};
</script>

<style>
</style>
