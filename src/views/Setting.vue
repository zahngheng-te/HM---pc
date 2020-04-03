<template>
  <div class="setting-container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUser()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="adit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus.js";
import auth from "@/utils/auth.js";
export default {
  name: "my-setting",
  data() {
    return {
      userInfo: {
        name: "111",
        intro: "",
        email: "",
        photo: ""
      },
      imageUrl: null
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    //获取用户数据
    async getUserInfo() {
      const {
        data: { data }
      } = await this.$http.get("user/profile");
      this.userInfo = data;
    },
    //提交修改请求
    async updateUser() {
      try {
        const { name, intro, email } = this.userInfo;
        await this.$http.patch("user/profile", { name, intro, email });
        this.$message.success("修改成功");
        eventBus.$emit("updateUserName", name);
        const user = auth.getUser();
        user.name = name;
        auth.setUser(user);
      } catch (e) {
        if (e.response && e.response.status === 409) {
          this.$message.error("用户名已存在！");
        } else {
          this.$message.error("修改失败！");
        }
      }
    }
  }
};
</script>

<style scoped lang='less'>
.adit-photo {
  font-size: 12px;
  text-align: center;
}
</style>