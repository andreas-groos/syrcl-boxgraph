<template>
  <div>
    <highcharts v-if="test && test.length > 0"
                :options="graphOptions"></highcharts>
  </div>
</template>

<script>
import { dailyTemp } from "../assets/dailyData.js";
import { getDay, getWeek, getMonth } from "date-fns";
import graphConfig from "../assets/graphConfig.js";

function test() {
  let dayOfWeek = null;
  let added = [];
  dailyTemp.map(d => {
    let day = getDay(new Date(d.date));
    if (day !== dayOfWeek) {
      added.push(d);
      dayOfWeek = day;
    }
  });
  console.log("added", added);
  let weekCounter = 0;
  let result = [];
  // for (let i = 0; i <= 3; i++) {
  //   result.push([0, i, null]);
  // }
  console.log("result", result);
  added.map(a => {
    let weekDay = getDay(new Date(a.date));
    if (weekDay === 0) {
      weekCounter++;
    }
    result.push([weekCounter, weekDay, a.temp]);
  });
  console.log("result", result);
  result[14];
  return result;
}
export default {
  name: "About",
  data() {
    return {
      test: test()
    };
  },
  computed: {
    graphOptions: function() {
      return {
        ...graphConfig,
        chart: {
          type: "heatmap",
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1
        },
        title: {
          text: "really rough heatmap"
        },
        // xAxis: {
        //   categories: [
        //     "Alexander",
        //     "Marie",
        //     "Maximilian",
        //     "Sophia",
        //     "Lukas",
        //     "Maria",
        //     "Leon",
        //     "Anna",
        //     "Tim",
        //     "Laura"
        //   ]
        // },
        yAxis: {
          categories: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ]
        },
        colorAxis: {
          min: 12,
          max: 25,
          minColor: "#000080",
          maxColor: "#800000"
        },
        series: [
          {
            data: this.test
          }
        ]
      };
    }
  }
};
</script>
