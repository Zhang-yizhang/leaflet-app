<template>
  <div class="container">
    <ul class="clearfix">
      <li>首页1</li>
      <li>首页2</li>
      <li>首页3</li>
      <li>首页4</li>
      <li>首页5</li>
    </ul>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  width: 100%;
  height: 60px;
  background: #008c8c;
}
.clearfix::after {
  display:"block";
  clear: both;
  content: "";

}
.container ul {
  height: 100%;
  margin-left: 100px;
}
.container ul li {
  float: left;
  line-height: 60px;
  font-size: 16px;
  margin: 0 10px;
  list-style: none;
  color: #fff;
}
.container ul li:hover{
    cursor: pointer;
    color: lightblue;
}
</style>