<template>
  <div class="article-container">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>
          <slot>内容管理</slot>
        </my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期：">
          <div class="block">
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 0 条结果：</div>
      <!-- 表格 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image fit="cover" :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../assets/shibai.jpg" alt>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="date" label="状态"></el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop="date" label="操作"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top:20px"></el-pagination>
    </el-card>
  </div>
</template>



<script>
export default {
  name: "my-article",
  data() {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      channelOptions: [],
      dataArr: [],
      articles: []
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const {
        data: { data }
      } = await this.$http.get("articles", { Params: this.reqParams });
      this.articles = data.results;
    },
    async getChannelOptions() {
      const {
        data: { data }
      } = await this.$http.get("channels");
      this.channelOptions = data.channels;
    }
  }
};
</script>

<style scoped lang='less'></style>