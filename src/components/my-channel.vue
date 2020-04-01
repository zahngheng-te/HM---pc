<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "my-channel",
  props: ["value"],
  data() {
    return {
      //频道id
      channelId: null,
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
  },
  methods: {
    // 获取频道下拉选项数据
    async getChannelOptions() {
      const {
        data: { data }
      } = await this.$http.get("channels");
      this.channelOptions = data.channels;
    },

    changeChannel(value) {
      if (value === "") value = null;
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped lang='less'></style>