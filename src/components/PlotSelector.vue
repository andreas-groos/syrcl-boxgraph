
<template>
  <div class="d-flex flex-column">
    <div v-for="plot in plots"
         :key="plot.name">
      <button type="button"
              @click="handleClick(plot)"
              class="btn btn-block btn-outline-primary"
              :class="{active: plot.value === plotStyle.value}">
        {{plot.name}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GraphSelector",
  data() {
    return {
      plots: [
        {
          name: "Box Plot by Station",
          value: "BoxPlotByStation",
          singleStation: false
        },
        {
          name: "Box Plot by Month",
          value: "BoxPlotByMonth",
          singleStation: true
        },
        {
          name: "Line Plot by Station",
          value: "LinePlotByStation",
          singleStation: false
        },
        {
          name: "Line Plot Single Year ",
          value: "LinePlotByYear",
          singleStation: true
        }
      ]
    };
  },
  methods: {
    handleClick: function(value) {
      this.$store.commit("setPlot", value);
    }
  },
  computed: {
    ...mapState({
      plotStyle: "plot"
    })
  }
};
</script>

<style>
.btn {
  text-align: left;
  list-style: none;
  margin-bottom: 10px;
}
</style>
