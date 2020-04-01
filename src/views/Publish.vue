<template>
  <div class="container">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px;">
        <el-form-item label="标题">
          <el-input v-model="articleFrom.title" placeholder="请输入文章标题" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容">文本</el-form-item>
        <el-form-item label="封面">
          <el-radio-group>
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div>封面组件</div>
        </el-form-item>
        <el-form-item label="频道">频道组件</el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-Publish",
  data() {
    return {
      articleFrom: {
        //标题
        title: null,
        //文章内容
        content: null,
        // 封面
        cover: {
          type: 1,
          images: []
        },
        // 频道id
        channel_id: null
      }
    };
  }
};
</script>

<style scoped lang='less'></style>