<template>
  <div class="login-container">
    <el-card class="my-card">
      <img src="../assets/logo_index.png" alt>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-login"
};
</script>

<style lang='less'>
.login-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/login_bg.jpg) no-repeat center;

  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);

    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>
