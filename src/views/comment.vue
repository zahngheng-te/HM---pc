<template>
  <div class="comment-container">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <!-- 使用面包屑组件 -->
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 评论表格 -->
      <el-table :data="comments">
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              size="small"
              v-if="!scope.row.comment_status"
              type="success"
            >打开评论</el-button>
            <el-button @click="toggleStatus(scope.row)" size="small" v-else type="danger">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePager"
        :total="1000"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-comment",
  data() {
    return {
      comments: [],
      reqParams: {
        response_type: "comment",
        page: 1,
        per_page: 20
      },
      total: 0
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    //打开关闭评论切换
    async toggleStatus(row) {
      try {
        const {
          data: { data }
        } = await this.$http.put(`comments/status?article_id=${row.id}`, {
          allow_comment: !row.comment_status
        });
        this.$message.success(
          data.allow_comment ? "打开评论成功！" : "关闭评论成功！"
        );
        row.comment_status = data.allow_comment;
      } catch (e) {
        this.$message.error("操作失败！");
      }
    },
    //分页
    changePager(newPage) {
      this.reqParams.page = newPage;
      this.getComments();
    },
    async getComments() {
      const {
        data: { data }
      } = await this.$http.get("articles", { params: this.reqParams });
      this.comments = data.results;
      this.total = data.total_count;
    }
  }
};
</script>

<style scoped lang='less'></style>