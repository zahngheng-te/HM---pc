<template>
  <div class="container-404">
    <el-row>
      <el-button type="primary" plain class="btn">返回首页</el-button>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.container-404 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/timg.jpg) center;
  .btn {
    width: 180px;
    height: 40px;
    border-radius: 30px;
    text-align: center;
  }
}
</style>