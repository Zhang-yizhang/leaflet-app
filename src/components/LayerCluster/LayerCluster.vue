<template>
  <div class="container"></div>
</template>

<script>
import L from "leaflet";
import Icon from "./marker-icon.png";
// import jsonData from "../data/geoJSON";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
export default {
  name: "LayerCluster",
  components: {},
  data() {
    return {
      coordinates: [],
      center: undefined
    };
  },
  watch: {
    coordinates(val) {
      if (val) {
        this.generateCluster();
      }
    }
  },
  created() {
    // this.generateCluster();
  },
  mounted() {
    this.generateRandomCoords();
    this.generateCluster();
  },
  methods: {
    // 生成随机坐标
    generateRandomCoords() {
      const coordinates = [];
      const bounds = window._map.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();
      const lngSpan = northEast.lng - southWest.lng;
      const latSpan = northEast.lat - southWest.lat;
      for (let i = 0; i < 50; i++) {
        coordinates.push(
          L.latLng(
            southWest.lat + latSpan * Math.random(),
            southWest.lng + lngSpan * Math.random()
          )
        );
      }
      this.coordinates = coordinates;

      console.log(coordinates);
    },
    generateCluster() {
      // 聚类图层组
      const clusterGroup = L.markerClusterGroup({
        showCoverageOnHover: false, // 当鼠标移到聚类图层上时是否显示覆盖范围
        zoomToBoundsOnClick: true, // 单击聚类图标时是跳转到以聚类图标为中心
        chunkedLoading: true,
        maxClusterRadius: 40 //默认80，最小聚类距离
      });
      clusterGroup.addTo(window._map);

      const markerList = [];
      const features = this.coordinates;
      // console.log(jsonData);
      if (features.length) {
        features.forEach(feature => {
          //   const properties = feature.properties;
          //   const coordinates = feature.geometry.coordinates;
          const icon = L.icon({
            iconUrl: Icon,
            iconSize: [25, 50]
          });
          const marker = L.marker(feature, {
            icon: icon
            // properties: properties
          });
          markerList.push(marker);
        });
        clusterGroup.addLayers(markerList);
      }
    }
  }
};
</script>

<style>
</style>