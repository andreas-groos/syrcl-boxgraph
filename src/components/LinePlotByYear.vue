<template>
  <div>
    <div class="row d-flex justify-content-center">
      <font-awesome-icon :icon="arrowLeft"
                         class="icons"
                         @click="changeYear(-1)"
                         size="lg" />
      <h5>{{currentYear}}</h5>
      <font-awesome-icon :icon="arrowRight"
                         class="icons"
                         @click="changeYear(1)"
                         size="lg" />
    </div>
    <highcharts v-if="plotData"
                :options="graphOptions">
    </highcharts>
  </div>
</template>

<script>
import graphConfig from "../assets/graphConfig.js";
import { linePlotDataPerStation } from "../utils";
import { mapState } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import arrowCircleLeft from "@fortawesome/fontawesome-free-solid/faArrowCircleLeft";
import arrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import { cloneDeep } from "lodash";

export default {
  name: "LinePlotByYear",
  data() {
    return {
      currentYear: 2017
    };
  },
  components: { FontAwesomeIcon },
  methods: {
    changeYear: function(amount) {
      console.log("`changeCHANGE");
      if (
        this.currentYear + amount >= this.plotData.startYear &&
        this.currentYear + amount <= this.plotData.endYear
      ) {
        this.currentYear += amount;
      } else {
        console.log("NOT");
      }
    }
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
        series: this.plotData.data,
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
          },
          // max: 25,
          // min: 0
          plotLines: [
            {
              color: "red", // Color value
              dashStyle: "longdashdot", // Style of the plot line. Default to solid
              value: 20, // Value of where the line will appear
              width: 2,
              label: {
                text: "levels above dangerous to aquatic organisms",
                align: "right"
              }
            }
          ]
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
    arrowLeft() {
      return arrowCircleLeft;
    },
    arrowRight() {
      return arrowCircleRight;
    },
    plotData: function() {
      console.log("this.loadedStations", this.loadedStations);
      let startYears = [];
      let endYears = [];
      this.loadedStations.map(station => {
        startYears.push(new Date(station.data[0].date).getFullYear());
        endYears.push(
          new Date(station.data[station.data.length - 1].date).getFullYear()
        );
      });
      let startYear = Math.min(...startYears);
      let endYear = Math.max(...endYears);
      console.log("startYear, endYear", startYear, endYear);
      let cloned = cloneDeep(this.loadedStations);
      cloned.map(station => {
        let temp = [];
        station.data.map(e => {
          if (new Date(e.date).getFullYear() === this.currentYear) {
            temp.push(e);
          }
        });
        console.log("temp", temp);
        station.data = temp;
      });
      console.log("this.loadedStations", this.loadedStations);
      console.log("cloned", cloned);
      let { data } = linePlotDataPerStation(cloned, this.param);
      // console.log("data", data);

      // console.log("singYearData", singleYearData);
      return { data, startYear, endYear };
    }
  }
};
</script>

<style scoped>
h5,
.icons {
  margin: 10px 20px;
}
</style>
