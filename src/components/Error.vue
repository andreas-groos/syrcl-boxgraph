<template>
  <div v-if="errors && errors.length">
    <div v-for="(error,index) in errors"
         :key="index">
      <div class="alert alert-danger"
           role="alert"
           @click="clickError(error.id)">
        {{error.msg}}
        <small class="text-muted">click to dismiss</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["errors"],
  methods: {
    clickError: function(id) {
      this.$store.commit("removeError", { id });
    }
  }
};
</script>

<style>
</style>
