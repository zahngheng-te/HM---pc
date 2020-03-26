<template>
  <el-container class="home-container">
    <el-aside class="my-aside" width="200px">
      <!-- logo -->
      <div class="logo"></div>
      <!-- 导航菜单 -->
      <el-menu
        style="border-right:none"
        default-active="1"
        background-color="#002244"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="icon el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img class="user-avatar" src="../assets/avatar.jpg" alt>
            <!-- 名字 -->
            <span class="user-name">张三</span>

            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span class="el-icon-s-custom"></span> 个人设置
            </el-dropdown-item>
            <el-dropdown-item>
              <span class="el-icon-switch-button"></span> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
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
  background-color: #002233;
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../assets/logo_admin.png) no-repeat center / 140px
      auto;
  }
}

.my-header {
  border-bottom: 1px solid #ddd;
  line-height: 60px;

  .icon {
    font-size: 24px;
    vertical-align: middle;
    padding-right: 10px;
  }
  .text {
    vertical-align: middle;
  }

  .my-dropdown {
    float: right;
    .user-avatar {
      vertical-align: middle;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .user-name {
      vertical-align: middle;
      font-weight: 700;
    }
  }
}
</style>