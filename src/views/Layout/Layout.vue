<template>
  <div class="container">
    <Nav></Nav>
    <Map></Map>
    <LayerCluster></LayerCluster>
  </div>
</template>

<script>
import Nav from "../Nav/Nav.vue";
import Map from "../../components/Map/Map.vue";
import LayerCluster from "../../components/LayerCluster/LayerCluster.vue";
export default {
  name: "Layout",
  components: {
    Nav,
    Map,
    LayerCluster
  }
};
</script>

<style>
</style>