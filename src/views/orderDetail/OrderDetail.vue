<template>
  <div class="order-detail-box">
    <nav-bar>
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">订单详情</div>
    </nav-bar>
    <div class="order-status">
      <div class="order-status-item">
        <label>订单状态：</label>
        <span>{{ detail.orderStatusString }}</span>
      </div>
      <div class="order-status-item">
        <label>订单编号：</label>
        <span>{{ detail.orderNo }}</span>
      </div>
      <div class="order-status-item">
        <label>下单时间：</label>
        <span>{{ detail.createTime }}</span>
      </div>
      <van-button v-if="detail.orderStatus == 0" color="#1baeae" style="margin-bottom: 10px" block @click="showPayFn">去支付</van-button>
      <van-button v-if="detail.orderStatus > 0 && detail.orderStatus != 4" block @click="cancelOrder(detail.orderNo)">取消订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ detail.totalPrice }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>

    <div class="goods-list">
      <van-card
        v-for="item in detail.newBeeMallOrderItemVOS"
        :key="item.goodsId"
        :num="item.goodsCount"
        :price="item.sellingPrice"
        desc="全场包邮"
        :title="item.goodsName"
        :thumb="item.goodsCoverImg"
      />
    </div>

    <van-popup v-model="showPay" position="bottom">
      <div class="pay-btn-wrap">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="payOrder(detail.orderNo,1)"
          >支付宝支付</van-button
        >
        <van-button color="#4fc08d" block @click="payOrder(detail.orderNo,2)"
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getOrderDetail, cancelOrder, payOrder } from "service/order";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      detail: {},
      showPay: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const { id } = this.$route.query;
      const { data } = await getOrderDetail(id);
      this.detail = data;
      Toast.clear();
    },
    async payOrder(id,type) {
      Toast.loading()
      await payOrder({ orderNo: id, payType: type })
      this.showPay = false
      Toast.clear();
      this.init()
    },
    showPayFn() {
      this.showPay = true
    },
    cancelOrder(id) {
      Dialog.confirm({
        title: '确认取消订单？'
      }).then( async () => {
        const { resultCode } = await cancelOrder(id)
        if(resultCode == 200) {
          Toast('取消成功')
          this.init()
        }
      }).catch(() =>{
        Dialog.close()
      })
    }
  },
};
</script>

<style lang="less" scoped>
.order-detail-box {
  background: #f7f7f7;
  .order-status {
    background: #ffffff;
    margin-top: 44px;
    padding: 20px;
    font-size: 15px;
    .order-status-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
    }
  }
  .order-price {
    background: #fff;
    margin: 20px 0;
    padding: 20px;
    font-size: 15px;
    .price-item {
      margin-bottom: 10px;
      label {
        color: #999;
      }
    }
  }

  .goods-list {
    .van-card {
      background: #ffffff;
      margin-top: 0;
    }
  }

  .pay-btn-wrap{
    width: 90%;
    margin: 0 auto;
    padding: 30px 0;
  }
}
</style>
