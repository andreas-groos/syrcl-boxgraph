import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueApollo from "vue-apollo";
import apolloClient from "./apollo";
// import HighchartsVue from "highcharts-vue"; // NOTE: Can't get official port working on vue-cli 3
import Highcharts from "highcharts";
import highchartsMore from "highcharts-more";
import VueHighcharts from "vue-highcharts"; // NOTE: unofficial client, would be good to switch
require("highcharts/modules/exporting")(Highcharts);
// TODO: customize export from https://api.highcharts.com/highcharts/exporting.csv
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/heatmap")(Highcharts);

highchartsMore(Highcharts);
Vue.config.productionTip = false;

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueHighcharts, { Highcharts });

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: h => h(App)
}).$mount("#app");
