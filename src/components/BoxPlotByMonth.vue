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
import { findIndex } from "lodash";

export default {
  name: "BoxPlot2",
  data() {
    return {};
  },
  computed: {
    ...mapState(["loadedStations", "param", "selectedStation"]),
    graphOptions: function() {
      return {
        ...graphConfig,
        title: {
          text: this.param.name + " for " + this.selectedStation.StationName
        },
        series: [
          {
            name: this.param.name,
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
      let index = findIndex(
        this.loadedStations,
        s => s.station.StationID === this.selectedStation.StationID
      );
      return boxPlotDataPerMonth(this.loadedStations[index], this.param);
    }
  }
};
</script>

<style>
</style>
