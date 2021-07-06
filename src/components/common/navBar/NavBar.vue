<template>
  <div class="nav-bar">
    <div class="left" @click="goBack"><slot name="left"></slot></div>
    <div class="title"><slot name="title"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    back: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      if (this.back) {
        this.$router.push(this.back);
      } else {
        this.$router.go(-1);
      }
      this.$emit("callback");
    },
  },
};
</script>

<style scoped lang="less">
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .wh(100%,44px);
  .fj();
  line-height: 44px;
  color: #252525;
  padding: 0 10px;
  .boxSizing();
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  z-index: 999;

  .title {
    font-size: 14px;
  }
  .left {
    width: 16px;
  }
  .right {
    width: 16px;
    opacity: 0;
  }
}
</style>
