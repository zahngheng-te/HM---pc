<template>
  <div class="publish-container">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id?'修改文章':'发布文章'}}</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div style="margin-top:10px" v-if="articleForm.cover.type===1">
            <my-cover v-model="articleForm.cover.images[0]"></my-cover>
          </div>
          <div style="margin-top:10px" v-if="articleForm.cover.type===3">
            <my-cover
              v-model="articleForm.cover.images[i-1]"
              v-for="i in 3"
              :key="i"
              style="display:inline-block;margin-right:15px"
            ></my-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="updateArticle()">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="addArticle(false)" type="primary">发布文章</el-button>
          <el-button @click="addArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor
  },
  name: "my-publish",
  data() {
    return {
      // 文章表单数据对象
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        // 占位配置
        placeholder: "",
        modules: {
          // 配置工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image"]
          ]
        }
      }
    };
  },
  watch: {
    "$route.query.id": function() {
      if (this.$route.query.id) {
        this.getArticle();
      } else {
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        };
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getArticle();
    }
  },
  methods: {
    // 发表文章
    async getArticle() {
      const {
        data: { data }
      } = await this.$http.get(`articles/${this.$route.query.id}`);
      this.articleForm = data;
    },
    async addArticle(draft) {
      try {
        await this.$http.post(`/articles?draft=${draft}`, this.articleForm);
        this.$message.success(draft ? "存入草稿成功" : "发布文章成功");
        this.$router.push("/article");
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    //修改文章
    async updateArticle() {
      try {
        await this.$http.put(
          `articles/${this.$route.query.id}?draft=false`,
          this.articleForm
        );
        this.$message.success("修改文章成功！");
        this.$router.push("/article");
      } catch (e) {
        this.$message.error("修改文章失败！");
      }
    }
  }
};
</script>

<style scoped lang='less'>
</style>