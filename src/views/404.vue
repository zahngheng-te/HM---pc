<template>
  <div class="container-404" @click="fanhui()"></div>
</template>

<script>
export default {
  name: "my-404",
  methods: {
    fanhui() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang='less'>
.container-404 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/timg.jpg) center;
}
</style>