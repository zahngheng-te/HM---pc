<template>
  <div class="article-container">
    <!-- 筛选条件区域 -->
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <!-- 使用面包屑组件 -->
        <my-bread>內容管理</my-bread>
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
          <el-select
            @change="changeChannel"
            clearable
            v-model="reqParams.channel_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeData"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterArticle()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image fit="cover" :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../assets/error.gif" style="width:150px;height:100px">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              @click="editArticle(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              @click="deleteArticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-article",
  data() {
    return {
      // 筛选条件对象数据
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据
      channelOptions: [],
      dateArr: [],
      // 文章列表
      articles: [],
      // 文章总条数
      total: 0
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
    //删除文章
    deleteArticle(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`articles/${id}`);
            this.$message.success("删除成功！");
            this.getArticles();
          } catch (e) {
            this.$message.error("删除失败！");
          }
        })
        .catch(() => {});
    },
    //编辑文章
    editArticle(id) {
      this.$router.push(`/publish?id=${id}`);
    },
    changeChannel(value) {
      if (value === "") this.reqParams.channel_id = null;
    },
    //筛选文章
    filterArticle() {
      //筛选后跳回第一页
      this.reqParams.page = 1;
      // 根据reqParams进行筛选展示
      this.getArticles();
    },
    //改变日期
    changeData(dataArr) {
      console.log(dataArr);
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0];
        this.reqParams.end_pubdate = dataArr[1];
      } else {
        this.reqParams.begin_pubdate = null;
        this.reqParams.end_pubdate = null;
      }
    },
    // 进行分页
    changePager(newPage) {
      // 根据新的页码，重新获取列表数据，进行渲染
      this.reqParams.page = newPage;
      this.getArticles();
    },
    // 获取文章列表数据
    async getArticles() {
      const {
        data: { data }
      } = await this.$http.get("articles", { params: this.reqParams });
      this.articles = data.results;
      // 总条数
      this.total = data.total_count;
    },
    // 获取频道下拉选项数据
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