<template>
  <div class="container">
      <Nav></Nav>
      <Map></Map>
  </div>
</template>

<script>
import Nav from '../Nav/Nav.vue'
import Map from '../../components/Map/Map.vue'
export default {
    name:"Layout",
    components:{
        Nav,
        Map
    }
}
</script>

<style>

</style>