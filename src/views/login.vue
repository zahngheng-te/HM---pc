<template>
  <div class="login-container">
    <el-card class="my-card">
      <img src="../assets/logo_index.png" alt>
      <el-form>
        <el-form-item>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        mobile: "",
        code: ""
      }
    };
  }
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
