<template>
  <div class="conatiner">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from "./views/Layout/Layout.vue";
export default {
  name: "App",
  components: {
    Layout
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
