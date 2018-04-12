<template>
  <div v-if="errors && errors.length">
    <ul>
      <li v-for="(error,index) in errors"
          :key="index">
        <p @click="clickError(error.id)">{{error.msg}}</p>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["errors"],
  methods: {
    clickError: function(id) {
      console.log("id", id);
      this.$store.commit("removeError", { id });
    }
  }
};
</script>

<style>
</style>
