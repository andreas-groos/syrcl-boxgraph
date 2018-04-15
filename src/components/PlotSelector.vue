
<template>
  <div class="d-flex flex-column">
    <div v-for="plot in plots"
         :key="plot.name">
      <button type="button"
              @click="handleClick(plot)"
              class="btn btn-block btn-outline-primary">
        {{plot.name}}
      </button>
    </div>
  </div>
</template>

<script>
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
          name: "Line Plot by Month",
          value: "LinePlotbyMonth",
          singleStation: true
        }
      ]
    };
  },
  methods: {
    handleClick: function(value) {
      this.$store.commit("setPlot", value);
    }
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
