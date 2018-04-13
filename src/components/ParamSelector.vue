<template>
  <div class="d-flex flex-column">
    <div v-for="param in params"
         :key="param.name">
      <button type="button"
              @click="handleClick(param)"
              class="btn btn-block btn-outline-primary">
        {{param.name}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParamSelector",
  data() {
    return {
      params: [
        { name: "Temp", value: "H2O_Temp" },
        { name: "Disolved O2", value: "H2O_DO" },
        { name: "Cond", value: "H2O_Cond" },
        { name: "Turbidity", value: "H2O_Turbidity" },
        { name: "pH", value: "H2O_pH" }
      ]
    };
  },
  methods: {
    handleClick: function(value) {
      this.$store.commit("setParam", value);
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
