<template>
  <div class="toolbar-container">
    <button :class="isPointClicked?'active':''" @click="pointClick">点</button>
    <button :class="isPolylineClicked?'active':''" @click="polylineClick">线</button>
    <button :class="isPolygonClicked?'active':''" @click="polygonClick">面</button>
    <button @click="clearAll">清除</button>
  </div>
</template>

<script>
import L from "leaflet";
export default {
  name: "ToolBar",
  components: {},
  data() {
    return {
      map: undefined,
      isPointClicked: false,
      isPolylineClicked: false,
      isPolygonClicked: false,
      isClear: false
    };
  },
  watch: {
    isPointClicked(val) {
      if (!val) {
        // 清除监听事件
        // this.map.clearAllEventListeners();
      }
    },
    isPolylineClicked(val) {
      if (!val) {
        // 清除监听事件
        //this.map.clearAllEventListeners();
      }
    },
    isPolygonClicked(val) {
      if (!val) {
        // 清除监听事件
        // this.map.clearAllEventListeners();
      }
    }
  },
  created() {
    //console.log("aaaaaa")
  },
  methods: {
    // 地图事件应该写为方法的形式，不然关闭绘制点事件的时候会关闭绘制线和面的事件。同理，线和面也如此
    pointClick() {
      if (this.isPointClicked) {
        this.isPointClicked = false;
        return;
      }
      this.isPointClicked = true;
      this.isPolylineClicked = false;
      this.isPolygonClicked = false;
      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      if (this.isPointClicked) {
        this.setCursor("crosshair");
      }
      console.log(window._map);
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
      if (this.isPolylineClicked) {
        this.isPolylineClicked = false;
        return;
      }
      this.isPolylineClicked = true;
      this.isPointClicked = false;
      this.isPolygonClicked = false;

      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      if (this.isPolylineClicked) {
        this.setCursor("crosshair");
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
      if (this.isPolygonClicked) {
        this.isPolygonClicked = false;
        return;
      }
      this.isPolygonClicked = true;
      this.isPointClicked = false;
      this.isPolylineClicked = false;
      if (!this.isPolygonClicked) {
        return;
      }
      if (window._map) {
        this.map = window._map;
        // 关闭地图双击事件
        this.map.doubleClickZoom.disable();
      }
      if (this.isPolygonClicked) {
        this.setCursor("crosshair");
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
    // 设置鼠标状态
    setCursor(state) {
      if (this.map) {
        this.map._container.style.cursor = state;
      }
    },

    // 清除图形
    clearAll() {
      this.isPointClicked = false;
      this.isPolylineClicked = false;
      this.isPolygonClicked = false;
      if (this.map) {
        this.map.eachLayer(layer => {
          if (!layer.options.layerName) {
            // debugger;
            layer.remove();
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar-container {
  position: absolute;
  top: 100px;
  margin-left: 10px;
  z-index: 9999;
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
/deep/.el-button + .el-button {
  margin-left: 0;
}
</style>>