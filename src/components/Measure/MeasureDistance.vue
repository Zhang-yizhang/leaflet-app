<template>
  <div v-if="distance" class="measure-div">
    <div class="select-unit">
      <div>
        <p>
          <span>单位</span>
        </p>
        <el-select v-model="distanceUnit">
          <el-option
            v-for="(item,index) in distanceOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="measure-result">
      <p>
        <span>长度</span>
      </p>
      <p>{{distanceRes+ " " + distanceUnit}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeasureDistance",
  props: {
    distance: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      distanceUnit: "Km",
      distanceOptions: [
        {
          label: "米",
          value: "m"
        },
        {
          label: "千米",
          value: "Km"
        }
      ]
    };
  },
  computed: {
    distanceRes() {
      
      if (this.distanceUnit !== "") {
        switch (this.distanceUnit) {
          case "Km":
            return (this.distance / 1000).toFixed(4);
          case "m":
            return this.distance.toFixed(4);
        }
      }
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.measure-div {
  position: absolute;
  background: #fff;
  margin-top: 200px;
  padding-bottom: 10px;
  text-align: left;
  z-index: 999;
  width: 240px;
  p {
    margin-bottom: 5px;
    span {
      font-weight: bold;
    }
  }
  .select-unit {
    padding: 10px;
  }
  .measure-result {
    background: #ddd;
    padding-left: 10px;
  }
}
</style>