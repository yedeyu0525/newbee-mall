<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <i class="iconfont icon-fenlei"></i>
      <span>分类</span>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <van-icon name="shopping-cart-o" :info="count" />
      <span>购物车</span>
    </tab-bar-item>
    <tab-bar-item path="/user">
      <i class="iconfont icon-wode"></i>
      <span>我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "components/common/tabBar/TabBar";
import tabBarItem from "components/common/tabBar/TabBarItem";
import { getLocal } from "common/js/utils";
export default {
  components: {
    tabBar,
    tabBarItem,
  },
  mounted() {
    let token = getLocal("token");
    if (token) {
      this.$store.dispatch("updateCart");
    }
  },
  computed: {
    count() {
      return this.$store.state.cartCount;
    },
  },
};
</script>

<style lang="less" scoped>
</style>