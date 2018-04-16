
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
import { format } from "date-fns";

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
          type: "spline",

          zoomType: 'xy"'
        },
        title: {
          text: this.param.name
        },
        tooltip: { shared: true },
        // https://experience.sap.com/fiori-design-web/values-and-names/
        colors: [
          "#5cbae6",
          "#b6d957",
          "#fac364",
          "#08cd3ff",
          "#d998cb",
          "#f2d249",
          "#93b9c6",
          "#ccc5a8",
          "52bacc",
          "dbd46",
          "98aafb"
        ],
        series: this.plotData,
        xAxis: {
          type: "datetime",
          // dateTimeLabelFormats: {
          //   month: "e%. b%",
          //   year: "%b"
          // },
          title: {
            text: "Date"
          }
        },
        yAxis: {
          title: {
            text: this.param.name
          }
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true,
              radius: 3
            }
          },
          series: { animation: false }
        },
        legend: {
          enabled: true
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
