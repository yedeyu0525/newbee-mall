<template>
  <div class="order-box">
    <nav-bar>
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">我的订单</div>
    </nav-bar>
    <van-tabs
      @change="onChangeTab"
      :color="'#1baeae'"
      :title-active-color="'#1baeae'"
      class="order-tab"
      v-model="status"
    >
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待确认" name="1"></van-tab>
      <van-tab title="待发货" name="2"></van-tab>
      <van-tab title="已发货" name="3"></van-tab>
      <van-tab title="交易完成" name="4"></van-tab>
    </van-tabs>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      class="order-list-refresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        @offset="300"
      >
        <div class="order-item" v-for="item in list" :key="item.orderId" @click="goTo(item.orderNo)">
          <div class="order-item-header">
            <span>订单时间：{{ item.createTime }}</span>
            <span>{{ item.orderStutasString }}</span>
          </div>
          <van-card
            v-for="one in item.newBeeMallOrderItemVOS"
            :key="one.goodsId"
            :num="one.goodsCount"
            :price="one.sellingPrice"
            :title="one.goodsName"
            :thumb="one.goodsCoverImg"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getOrderList } from "service/order";
export default {
  data() {
    return {
      status: "",
      page: 1,
      totalPage: 0,
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
    };
  },
  methods: {
    async getData() {
      const {
        data,
        data: { list },
      } = await getOrderList({
        pageNumber: this.page,
        status: this.status,
      });
      this.loading = false;
      this.totalPage = data.totalPage;
      this.list = this.list.concat(list);
      if (this.page >= data.totalPage) this.finished = true;
    },
    onChangeTab(name) {
      this.status = name;
      this.onRefresh();
    },
    goTo(id) {
      this.$router.push(`order-detail?id=${id}`)
    },
    onLoad() {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page += 1;
      }
      if(this.refreshing){
        this.list = [];
        this.refreshing = false;
      }
      this.loading = true;
      this.getData();
    },
    onRefresh() {
      this.page = 1;
      this.refreshing = true;
      this.finished = false;
      this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
.order-box {
  .order-tab {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 99;
  }
  .order-item {
    margin: 20px 10px;
    background: #ffffff;
    .order-item-header {
      .fj();
      padding: 10px 20px 0 20px;
    }
    .van-card{
      background: #ffffff;
    }
  }
  .order-list-refresh {
    margin-top: 68px;
    .van-list {
      min-height: calc(100vh - 88px);
      background: #f9f9f9;
      margin-top: 20px;
    }
  }
}
</style>