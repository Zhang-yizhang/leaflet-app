<template>
  <div v-if="area" class="measure-div">
    <div class="select-unit">
      <div>
        <p>
          <span>单位</span>
        </p>
        <el-select v-model="areaUnit">
          <el-option
            v-for="(item,index) in areaOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="measure-result">
      <p>
        <span>面积</span>
      </p>
      <p>{{areaRes+ " " + areaUnit}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MeasureArea",
  props: {
    area: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      areaUnit: "Km2",
      areaOptions: [
        {
          label: "平方米",
          value: "m2"
        },
        {
          label: "平方千米",
          value: "Km2"
        }
      ]
    };
  },
  computed: {
    areaRes() {
      if (this.areaUnit !== "") {
        switch (this.areaUnit) {
          case "Km2":
            return (this.area / 1000000).toFixed(4);
          case "m2":
            return this.area.toFixed(4);
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