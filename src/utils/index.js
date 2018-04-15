import { quantile } from "simple-statistics";
import { getMonth, format } from "date-fns";

/**
 * Turns array into [min,q25,q5,q75,max] for boxgraphs
 *
 * @export get5
 * @param {Number} arr
 * @returns {Array} [min,q25,q5,q75,max]
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
export function boxPlotDataPerStation(stations, param) {
  let result = [];
  stations.map(s => {
    let temp = [];
    let singleStationData = s.data;
    singleStationData.map(m => {
      try {
        if (m.results.H2O_Temp.mean) {
          temp.push(m.results[param.value].mean);
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

export function boxPlotDataPerMonth(station, param) {
  if (station) {
    let temp = new Array(12).fill([]);
    let { data } = station;
    data.map(m => {
      if (m.date) {
        const month = getMonth(m.date);
        try {
          temp[month] = temp[month].concat(m.results[param.value].mean);
          // eslint-disable-next-line
        } catch (err) {}
      }
    });
    return temp;
  } else return null;
}

export function linePlotDataPerStation(stations, param) {
  let allStationsTemp = [];
  if (stations) {
    // console.log("stations", stations);
    // console.log("param", param);
    stations.map(s => {
      let singleStationTemp = [];
      console.log("s", s);
      s.data.map(d => {
        console.log("d", d);
        try {
          let dateArr = d.date.split("-");
          singleStationTemp.push([
            Date.UTC(dateArr[0], dateArr[1], dateArr[2]),
            d.results[param.value].mean
          ]);
        } catch (e) {
          console.log(e);
        }
      });
      console.log("singleStationTemp", singleStationTemp);
      allStationsTemp.push({
        name: s.station.StationName,
        data: singleStationTemp
      });
      console.log("----------------------");
    });
    return allStationsTemp;
  } else return null;
}
