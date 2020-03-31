<template>
  <div class="images-container">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮栏 -->
      <div class="btn_box">
        <el-radio-group v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right">添加收藏</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="i in 10" :key="i">
          <img src="../assets/avatar.jpg" alt>
          <div class="option">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-image",
  data() {
    return {
      // 查询素材参数
      reqParams: {
        //   默认查询全部
        collect: false,
        page: 1,
        per_page: 10
      }
    };
  }
};
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    display: inline-block;
    position: relative;
    margin-right: 50px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      width: 100%;
      color: #fff;
      span {
        margin: 0 30px;
      }
    }
  }
}
</style>