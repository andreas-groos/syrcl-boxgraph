import { quantile } from "simple-statistics";
import { getMonth } from "date-fns";

/**
 * Turns array into [min,q25,q5,q75,max] for boxgraphs
 *
 * @export get5
 * @param {Number} arr
 * @returns {array} [min,q25,q5,q75,max]
 */
export function get5(arr) {
  return [
    Math.min(...arr),
    quantile(arr, 0.25),
    quantile(arr, 0.5),
    quantile(arr, 0.75),
    Math.max(...arr)
  ];
}
export function boxPlotDataPerStation(stations) {
  let result = [];
  stations.map(s => {
    let temp = [];
    let singleStationData = s.data;
    singleStationData.map(m => {
      try {
        if (m.results.H2O_Temp.mean) {
          temp.push(m.results.H2O_Temp.mean);
        }
        /* eslint-disable-next-line */
      } catch (e) {}
    });
    let min = Math.min(...temp);
    let max = Math.max(...temp);
    let q25 = quantile(temp, 0.25);
    let q5 = quantile(temp, 0.5);
    let q75 = quantile(temp, 0.75);
    result.push({
      station: s.station,
      data: [min, q25, q5, q75, max]
    });
  });
  return result;
}

export function boxPlotDataPerMonth(station) {
  if (station) {
    console.log("station", station);
    let temp = new Array(12).fill([]);
    let { data } = station;
    console.log("temp", temp);
    console.log("data", data);
    data.map((m, index) => {
      if (m.date) {
        // console.log(
        //   "m.date, getMonth(m.results.date)",
        //   m.date,
        //   getMonth(m.date)
        // );
        console.log("index", index);
        const month = getMonth(m.date);
        try {
          console.log(
            "month , m.results.H2O_Temp.mean",
            month,
            m.results.H2O_Temp.mean
          );
          console.log("temp[month]", temp[month]);
          temp[month] = temp[month].concat(m.results.H2O_Temp.mean);
          console.log("temp[month]", temp[month]);
          console.log("temp", temp);
          console.log("-----------------------------");
        } catch (err) {}
      }
    });
    console.log("temp", temp);
    // let min = Math.min(...temp);
    // let max = Math.max(...temp);
    // let q25 = quantile(temp, 0.25);
    // let q5 = quantile(temp, 0.5);
    // let q75 = quantile(temp, 0.75);
    // result.push({ station: s.station, data: [min, q25, q5, q75, max] });
    return temp;
  } else return null;
}
