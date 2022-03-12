<template>
  <div class="toolbar-container">
    <div class="toolbar">
      <button :class="isPointClicked?'active':''" @click="pointClick" title="绘制点">
        <i class="iconfont icon-huizhidian"></i>
      </button>
      <button :class="isPolylineClicked?'active':''" @click="polylineClick" title="绘制线">
        <i class="iconfont icon-hongxianhuizhi"></i>
      </button>
      <button :class="isPolygonClicked?'active':''" @click="polygonClick" title="绘制面">
        <i class="iconfont icon-huizhimian"></i>
      </button>
      <button :class="isMeasureDistance?'active':''" @click="measureDistance" title="测距">
        <i class="iconfont icon-kongjianjuliceliang1"></i>
      </button>
      <button :class="isMeasureArea?'active':''" @click="measureArea" title="测面">
        <i class="iconfont icon-mianjiceliang1"></i>
      </button>
      <button @click="clearAll">
        <i class="iconfont icon-shuyi_qingchu-lajitong" title="清除"></i>
      </button>
    </div>
    <MeasureDistance v-if="isMeasureDistance" :distance="finalValue"></MeasureDistance>
    <MeasureArea v-if="isMeasureArea" :area="area"></MeasureArea>
  </div>
</template>

<script>
import L from "leaflet";
import eventBus from "../js/bus";
import MeasureDistance from "../Measure/MeasureDistance.vue";
import MeasureArea from "../Measure/MeasureArea.vue";
import * as turf from "@turf/turf";
export default {
  name: "ToolBar",
  components: { MeasureDistance, MeasureArea },
  data() {
    return {
      map: undefined,
      isPointClicked: false,
      isPolylineClicked: false,
      isPolygonClicked: false,
      isMeasureDistance: false,
      isMeasureArea: false,
      isClear: false,
      distance: 0,
      finalValue: 0, // 最终距离
      tempDistance: 0, //临时线段长度
      area: 0
    };
  },
  watch: {
    isPointClicked(val) {
      if (val) {
        this.$nextTick(() => {
          this.setCursor("crosshair");
        });
        this.isPolylineClicked = false;
        this.isPolygonClicked = false;
        this.isMeasureDistance = false;
        this.isMeasureArea = false;
      } else {
        this.setCursor("pointer");
      }
    },
    isPolylineClicked(val) {
      if (val) {
        this.$nextTick(() => {
          this.setCursor("crosshair");
        });
        this.isPointClicked = false;
        this.isPolygonClicked = false;
        this.isMeasureDistance = false;
        this.isMeasureArea = false;
      } else {
        this.setCursor("pointer");
      }
    },
    isPolygonClicked(val) {
      if (val) {
        this.$nextTick(() => {
          this.setCursor("crosshair");
        });
        this.isPointClicked = false;
        this.isPolylineClicked = false;
        this.isMeasureDistance = false;
        this.isMeasureArea = false;
      } else {
        this.setCursor("pointer");
      }
    },
    isMeasureDistance(val) {
      if (val) {
        this.distance = 0;
        this.area = 0;
        this.tempDistance = 0;
        this.finalValue = 0
        this.setCursor("crosshair");
        this.isPointClicked = false;
        this.isPolylineClicked = false;
        this.isPolygonClicked = false;
        this.isMeasureArea = false;
      } else {
        this.setCursor("pointer");
      }
    },
    isMeasureArea(val) {
      if (val) {
        this.area = 0;
        this.distance = 0;
        this.tempDistance = 0;
         this.finalValue = 0
        this.setCursor("crosshair");
        this.isPointClicked = false;
        this.isPolylineClicked = false;
        this.isPolygonClicked = false;
        this.isMeasureDistance = false;
      } else {
        this.setCursor("pointer");
      }
    },
    distance() {
      this.sendDistance;
    },
    tempDistance(val) {
      if (val) {
        this.finalValue = this.distance + val;
      }
    }
  },
  created() {
    //console.log("aaaaaa")
  },
  methods: {
    // 地图事件应该写为方法的形式，不然关闭绘制点事件的时候会关闭绘制线和面的事件。同理，线和面也如此
    pointClick() {
      this.isPointClicked = !this.isPointClicked;
      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      const circleOption = {
        radius: 10,
        fill: true,
        color: "red",
        weight: 3.5, // 边线宽度：单位像素值
        opacity: 1, // 边线透明度
        fillColor: "red",
        fillOpacity: 1 // 最好设置透明度，默认值0.2
      };

      const onClick = evt => {
        console.log(evt.latlng);
        L.circle(evt.latlng, circleOption).addTo(this.map);
      };
      this.map.on("click", onClick);
      this.map.on("dblclick", () => {
        // 关闭单击事件
        this.map.off({ click: onClick });
        this.setCursor("pointer");
        // 开启双击事件
        this.map.doubleClickZoom.enable();
      });
    },
    polylineClick() {
      this.isPolylineClicked = !this.isPolylineClicked;
      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      const latlngs = [];
      // circle 样式
      const circleOption = {
        radius: 10,
        fill: true,
        color: "#ffb61e",
        weight: 3.5, // 边线宽度：单位像素值
        opacity: 1, // 边线透明度
        fillColor: "blue",
        fillOpacity: 1 // 最好设置透明度，默认值0.2
      };

      // 线段样式
      const polylineOption = {
        stroke: true, // 开启路径追踪,默认为true
        color: "yellow"
      };
      // 绘制线段
      const polyline = L.polyline(latlngs, polylineOption);
      // 临时线段
      const tempLine = L.polyline([], polylineOption);
      console.log(tempLine);
      const onClick = evt => {
        latlngs.push([evt.latlng.lat, evt.latlng.lng]);
        const circle = L.circle(evt.latlng, circleOption);
        circle.addTo(this.map);
        polyline.addLatLng(evt.latlng);
        polyline.addTo(this.map);
      };
      this.map.on("click", onClick);
      const onMouseMove = evt => {
        // 至少有一个点才添加临时线段
        if (latlngs.length > 0) {
          // 添加临时线段
          const coords = [
            latlngs[latlngs.length - 1],
            [evt.latlng.lat, evt.latlng.lng]
          ];
          tempLine.setLatLngs(coords);
          this.map.addLayer(tempLine);
        }
      };
      this.map.on("mousemove", onMouseMove);

      // 双击结束绘制
      this.map.on("dblclick", () => {
        // 关闭单击事件
        this.map.off({ click: onClick, mousemove: onMouseMove });
        this.setCursor("pointer");
        // 开启双击事件
        this.map.doubleClickZoom.enable();
      });
    },
    polygonClick() {
      this.isPolygonClicked = !this.isPolygonClicked;
      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      const latlngs = [];
      // circle 样式
      const circleOption = {
        radius: 10,
        fill: true,
        color: "#ffb61e",
        weight: 3.5, // 边线宽度：单位像素值
        opacity: 1, // 边线透明度
        fillColor: "blue",
        fillOpacity: 1 // 最好设置透明度，默认值0.2
      };

      // 线段样式
      const polylineOption = {
        stroke: true, // 开启路径追踪,默认为true
        color: "yellow"
      };
      const polyline = L.polyline(latlngs, polylineOption);
      const tempLine = L.polyline([], polylineOption);
      const polygon = L.polygon(latlngs, polylineOption);
      const onClick = evt => {
        latlngs.push([evt.latlng.lat, evt.latlng.lng]);
        L.circle(evt.latlng, circleOption).addTo(this.map);
        polyline.addLatLng(evt.latlng);
        polyline.addTo(this.map);
        polygon.addLatLng(evt.latlng);
        polygon.addTo(this.map);
      };
      this.map.on("click", onClick);
      const onMouseMove = evt => {
        // 至少有一个点才添加临时线段
        if (latlngs.length > 0) {
          //面的临时线段坐标顺序[起点，鼠标移动点，最后一次点击点]
          tempLine.setLatLngs([
            latlngs[0],
            evt.latlng,
            latlngs[latlngs.length - 1]
          ]);
          //tempLine.setLatLngs([[latlngs[0],]])
          tempLine.addTo(this.map);
          polygon.setLatLngs([...latlngs, evt.latlng]);
        }
      };
      this.map.on("mousemove", onMouseMove);

      this.map.on("dblclick", () => {
        // 关闭单击事件
        this.map.off({ click: onClick, mousemove: onMouseMove });
        this.setCursor("pointer");
        // 开启双击事件
        this.map.doubleClickZoom.enable();
      });
    },
    measureDistance() {
      this.isMeasureDistance = !this.isMeasureDistance;
      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      const latlngs = [];
      // circle 样式
      const circleOption = {
        radius: 10,
        fill: true,
        color: "yellow",
        weight: 3.5, // 边线宽度：单位像素值
        opacity: 1, // 边线透明度
        fillColor: "yellow",
        fillOpacity: 1 // 最好设置透明度，默认值0.2
      };

      // 线段样式
      const polylineOption = {
        stroke: true, // 开启路径追踪,默认为true
        color: "yellow"
      };
      // 绘制线段
      const polyline = L.polyline(latlngs, polylineOption);
      // 临时线段
      const tempLine = L.polyline([], polylineOption);
      const onClick = evt => {
        latlngs.push([evt.latlng.lat, evt.latlng.lng]);
        const circle = L.circle(evt.latlng, circleOption);
        circle.addTo(this.map);
        polyline.addLatLng(evt.latlng);
        polyline.addTo(this.map);
        if (latlngs.length === 1) {
          this.distance = this.tempDistance;
        }
        if (latlngs.length === 2) {
          this.distance = this.map.distance(latlngs[0], latlngs[1]);
        }
        if (latlngs.length > 2) {
          this.distance += this.map.distance(
            latlngs[latlngs.length - 2],
            latlngs[latlngs.length - 1]
          );
        }
      };
      this.map.on("click", onClick);
      const onMouseMove = evt => {
        // 至少有一个点才添加临时线段
        if (latlngs.length > 0) {
          // 添加临时线段
          const coords = [
            latlngs[latlngs.length - 1],
            [evt.latlng.lat, evt.latlng.lng]
          ];
          tempLine.setLatLngs(coords);
          this.map.addLayer(tempLine);
        }
        if (latlngs.length == 1) {
          this.tempDistance = this.map.distance(latlngs[0], evt.latlng);
        }
        if (latlngs.length > 1) {
          this.tempDistance = this.map.distance(
            latlngs[latlngs.length - 1],
            evt.latlng
          );
        }
      };
      this.map.on("mousemove", onMouseMove);

      // 双击结束绘制
      this.map.on("dblclick", () => {
        // 关闭单击事件
        this.map.off({ click: onClick, mousemove: onMouseMove });
        this.setCursor("pointer");
        // 开启双击事件
        this.map.doubleClickZoom.enable();
      });
    },
    measureArea() {
      this.isMeasureArea = !this.isMeasureArea;
      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      const latlngs = [];
      // circle 样式
      const circleOption = {
        radius: 10,
        fill: true,
        color: "yellow",
        weight: 3.5, // 边线宽度：单位像素值
        opacity: 1, // 边线透明度
        fillColor: "yellow",
        fillOpacity: 1 // 最好设置透明度，默认值0.2
      };

      // 线段样式
      const polylineOption = {
        stroke: true, // 开启路径追踪,默认为true
        color: "yellow"
      };
      const polyline = L.polyline(latlngs, polylineOption);
      const tempLine = L.polyline([], polylineOption);
      const polygon = L.polygon(latlngs, polylineOption);
      const onClick = evt => {
        latlngs.push([evt.latlng.lat, evt.latlng.lng]);
        L.circle(evt.latlng, circleOption).addTo(this.map);
        polyline.addLatLng(evt.latlng);
        polyline.addTo(this.map);
        polygon.addLatLng(evt.latlng);
        polygon.addTo(this.map);
      };

      this.map.on("click", onClick);
      const onMouseMove = evt => {
        // 至少有一个点才添加临时线段
        if (latlngs.length > 0) {
          //面的临时线段坐标顺序[起点，鼠标移动点，最后一次点击点]
          tempLine.setLatLngs([
            latlngs[0],
            evt.latlng,
            latlngs[latlngs.length - 1]
          ]);
          //tempLine.setLatLngs([[latlngs[0],]])
          tempLine.addTo(this.map);
          polygon.setLatLngs([...latlngs, evt.latlng]);
          // 测量面积
          this.area = turf.area(polygon.toGeoJSON());
        }
      };
      this.map.on("mousemove", onMouseMove);

      this.map.on("dblclick", () => {
        // 关闭单击事件
        this.map.off({ click: onClick, mousemove: onMouseMove });
        this.setCursor("pointer");
        // 开启双击事件
        this.map.doubleClickZoom.enable();
      });
    },
    // 设置鼠标状态
    setCursor(state) {
      if (this.map) {
        this.map._container.style.cursor = state;
      }
    },
    // 传递距离参数
    sendDistance() {
      const result = this.distance + this.tempDistance;
      eventBus.$emit("sendDistance", result);
    },

    // 清除图形
    clearAll() {
      this.isPointClicked = false;
      this.isPolylineClicked = false;
      this.isPolygonClicked = false;
      this.isMeasureDistance = false;
      this.isMeasureArea = false;
      if (this.map) {
        this.map.eachLayer(layer => {
          if (!layer.options.layerName) {
            layer.remove();
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
}
.toolbar-container {
  position: absolute;
  top: 100px;
  margin-left: 10px;
  z-index: 999;
  button {
    display: block;
    width: 35px;
    height: 35px;
    border: none;
    border: 1px solid #ddd;
    border-bottom: none;
    cursor: pointer;
    &:hover {
      background: #ddd;
    }
  }
  button:last-child {
    border-bottom: 1px solid #ddd;
  }
}
.active {
  background: #ddd;
}
::deep.el-button + .el-button {
  margin-left: 0;
}
</style>>