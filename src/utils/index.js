import { quantile } from "simple-statistics";
import { getMonth, getYear, format } from "date-fns";
import { sortBy } from "lodash";

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
    stations.map(s => {
      let singleStationTemp = [];
      s.data.map(d => {
        try {
          singleStationTemp.push([d.date, d.results[param.value].mean]);
        } catch (e) {
          console.log(e);
        }
      });
      singleStationTemp = nullBuffer(singleStationTemp);
      let utcTemp = [];
      singleStationTemp.map(s => {
        let dateArr = s[0].split("-");
        utcTemp.push([Date.UTC(dateArr[0], dateArr[1], dateArr[2]), s[1]]);
      });
      allStationsTemp.push({
        name: s.station.StationName,
        data: utcTemp
      });
    });
    return allStationsTemp;
  } else return null;
}

/**
 * fills in months that don't have any data with null so that charts show gaps
 *
 * @export nullBuffer
 * @param {Array} data
 * @returns {Array} array of StationVisits
 */
export function nullBuffer(data) {
  let startYear = getYear(data[0][0]);
  console.log("startYear", startYear);
  let endYear = getYear(data[data.length - 1][0]);
  for (let year = startYear; year <= endYear; year++) {
    for (let month = 0; month <= 11; month++) {
      let valueExists = data.some((e, index) => {
        let m = getMonth(e[0]);
        let y = getYear(e[0]);
        if (m === month && y === year) {
          return true;
        }
      });
      if (!valueExists) {
        let monthStr = (month + 1).toString();
        if (month < 9) {
          monthStr = "0" + monthStr;
        }
        data.push([year.toString() + "-" + monthStr + "-01", null]);
      }
    }
  }
  return sortBy(data, o => o[0]);
}
