<template>
  <div class="login-container">
    <el-card class="my-card">
      <img src="../assets/logo_index.png" alt>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
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
          <el-button @click="login()" type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("格式错误！"));
      }
    };
    return {
      loginForm: {
        mobile: "",
        code: ""
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "长度为6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$http
            .post("authorizations", this.loginForm)
            .then(res => {
              this.$router.push("/");
            })
            .catch(() => {
              this.$message.error("手机号或验证码错误！");
            });
        }
      });
    }
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
