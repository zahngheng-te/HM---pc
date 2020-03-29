<template>
  <div class="test">
    <slot name="center" :info="msg"></slot>
  </div>
</template>

<script>
export default {
  name: "my-test",
  data() {
    return {
      msg: "123"
    };
  }
};
</script>

<style></style>