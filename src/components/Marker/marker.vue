<template></template>

<script>
import L from "leaflet";
export default {
  name: "Marker",
  creaed() {
    this.addMarker();
  },
  methods: {
    addMarker() {
      const icon = L.icon({
        iconUrl: "../../assets/image/location.png",
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
        // shadowUrl: "my-icon-shadow.png",
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
      });
      L.marker([24.89299, 102.836694], { icon: icon }).addTo(_map);
    }
  }
};
</script>

<style>
</style>