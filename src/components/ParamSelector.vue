<template>
  <div class="d-flex flex-column">
    <div v-for="param in params"
         :key="param.name">
      <button type="button"
              @click="handleClick(param)"
              class="btn btn-block btn-outline-primary"
              :class="{active: param.value === selectedParam.value}">
        {{param.name}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  },
  computed: {
    ...mapState({
      selectedParam: "param"
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
