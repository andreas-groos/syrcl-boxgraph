import { quantile } from "simple-statistics";

export function boxPlotData(stations) {
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
    result.push({ station: s.station, data: [min, q25, q5, q75, max] });
  });
  return result;
}
