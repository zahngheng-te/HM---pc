<template>
  <el-container class="home-container">
    <el-aside class="my-aside" width="200px">Aside</el-aside>
    <el-container>
      <el-header class="my-header">Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "my-name"
};
</script>

<style scoped lang='less'>
.home-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.my-aside {
  background-color: #002244;
}

.my-header {
  border-bottom: 1px solid #ddd;
}
</style>