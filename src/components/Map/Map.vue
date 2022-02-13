<template>
  <div class="map-container">
    <div id="map2d"></div>
    <Toolbar></Toolbar>
  </div>
</template>

<script>
import L from "leaflet";
import Icon from "./marker-icon.png";
import IconShadow from "./marker-shadow.png";
import Toolbar from "../ToolBar/ToolBar.vue";
export default {
  name: "Map",
  components: {
    Toolbar
  },
  created() {},
  mounted() {
    // 必须在组件挂载之后初始化地图，不然会报错
    this.initMap();
  },
  methods: {
    initMap() {
      const map = L.map("map2d", {
        crs: L.CRS.EPSG3857,
        center: [24.886566, 102.830513],
        zoom: 11
      });
      // console.log("map:", map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        layerName: "streetMap"
      }).addTo(map);

      const latlng1 = L.latLng([24.89299, 102.836694]);
      const latlng2 = L.latLng([24.85101, 102.795231]);
      const latlng3 = L.latLng([24.79112, 102.795231]);
      const myIcon = L.icon({
        iconUrl: Icon,
        // iconSize: [40, 40],
        // iconAnchor: [22, 94],
        iconAnchor: [0, 0],
        // popupAnchor: [-3, -76]
        shadowUrl: IconShadow,
        // shadowSize: [40, 40],
        // shadowAnchor: [-2, 0]
        shadowAnchor: [0, 0]
      });
      const marker1 = L.marker(latlng1, { icon: myIcon }).addTo(map);
      const marker2 = L.marker(latlng2, { icon: myIcon }).addTo(map);
      const marker3 = L.marker(latlng3, { icon: myIcon }).addTo(map);

      let popup1 = L.popup();
      let popup2 = L.popup();

      let toolTip = L.tooltip();
      // toolTip.bindTooltip("Hello!")
      toolTip.setTooltipContent(
        "<p>Hello world1!<br />This is a nice popup.</p>"
      );

      popup1
        .setLatLng(latlng1)
        .setContent("<p>Hello world1!<br />This is a nice popup.</p>");

      popup2
        .setLatLng(latlng2)
        .setContent("<p>Hello world2!<br />This is a nice popup.</p>");

      marker1.bindPopup(popup1);
      marker2.bindPopup(popup2);

      marker3.bindTooltip("my tooltip text").openTooltip();
      // marker3.bindTooltip(toolTip).openTooltip();

      marker1.on("popupopen", evt => {
        console.log("evtopen:", evt);
      });
      marker1.on("popupclose", evt => {
        console.log("evtclose:", evt);
      });
      //将map注册为全局变量
      window._map = map;
    }
  }
};
</script>

<style scoped>
.map-container {
  position: absolute;
  top: 60px;
  left: 0;
  /* height: 100%; */
  width: 100%;
  bottom: 0;
}
#map2d {
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0;
}
</style>