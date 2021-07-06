<template>
  <div class="create-order">
    <nav-bar @callback="callback">
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">生成订单</div>
    </nav-bar>
    <div class="address-wrap" @click="goTo" v-if="address">
      <div class="name">
        <span>{{ address.userName }} </span>
        <span>{{ address.userPhone }}</span>
      </div>
      <div class="address">
        {{
          address.provinceName +
          address.cityName +
          address.regionName +
          address.detailAddress
        }}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="address-null" v-else>
      <van-button type="primary" block to="address">选择收货地址</van-button>
    </div>
    <div class="good">
      <div class="good-item" v-for="item in cartList" :key="item.goodsId">
        <div class="good-img">
          <img :src="prefix(item.goodsCoverImg)" alt="" />
        </div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goodsName }}</span>
            <span>x{{ item.goodsCount }}</span>
          </div>
          <div class="good-price">¥{{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button
        @click="createOrder"
        class="pay-btn"
        color="#1baeae"
        type="primary"
        block
        >生成订单</van-button
      >
    </div>
    <van-popup v-model="showPay" position="bottom" @close="close">
      <div class="pay-btn-wrap">
        <van-button
          :style="{ marginBottom: '10px' }"
          color="#1989fa"
          block
          @click="payOrder(1)"
          >支付宝支付</van-button
        >
        <van-button color="#4fc08d" block @click="payOrder(2)"
          >微信支付</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getByCartItemIds } from "service/cart";
import { getAddressDetail, getDefaultAddress } from "service/address";
import { createOrder, payOrder } from "service/order";
import { setLocal, getLocal } from "common/js/utils";
export default {
  data() {
    return {
      showPay: false,
      cartList: [],
      address: null,
      cartItemIds: [],
      orderNo: ''
    };
  },
  computed: {
    total() {
      let total = 0;
      this.cartList.forEach((item) => {
        total += item.sellingPrice * item.goodsCount;
      });
      return total;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化
     * 1.获取参数商品ID、地址ID
     * 2、
    */
    async init() {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const { cartItemIds, addressId } = this.$route.query;
      cartItemIds && setLocal("cartItemIds", cartItemIds);
      this.cartItemIds = cartItemIds
        ? JSON.parse(cartItemIds)
        : JSON.parse(getLocal("cartItemIds"));
      const { data: list } = await getByCartItemIds({
        cartItemIds: this.cartItemIds.join(","),
      });
      const { data: address } = addressId
        ? await getAddressDetail(addressId)
        : await getDefaultAddress();
      this.cartList = list;
      this.address = address;
      Toast.clear();
    },
    /**
     * 创建订单
    */
    async createOrder() {
      if(!this.address) {
        Toast('请选择收货地址')
        return
      }
      const params = {
        addressId: this.address.addressId,
        cartItemIds: this.cartItemIds
      }
      const { data } = await createOrder(params);
      this.orderNo = data;
      this.showPay = true;
      this.callback()
    },
    /**
     * 支付订单
    */
    async payOrder(type) {
      const params = {
        orderNo: this.orderNo,
        payType: type
      }
      await payOrder(params)
      this.showPay = false
    },
    close() {
      this.$router.replace('order')
    },
    /**
     * 头部返回按钮回调函数
    */
    callback() {
      if(!this.$route.query.cartItemIds){
        this.$router.go(-1)
      }
      setLocal("cartItemIds", "");
    },
    goTo() {
      this.$router.push('address');
    },
  },
};
</script>


<style lang="less" scoped>
.create-order {
  .address-null {
    padding: 0 20px;
    margin-top: 44px;
  }
  .address-wrap {
    margin-top: 44px;
    margin-bottom: 20px;
    position: relative;
    background: #ffffff;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
      padding-right: 20px;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        red 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        45deg,
        #ff6c6c 0%,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0%,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
    }
  }

  .good {
    padding-bottom: 100px;
    .good-item {
      display: flex;
      padding: 10px;
      .good-img {
        img {
          .wh(100px,100px);
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        flex: 1;
        .good-title {
          .fj();
          font-size: 14px;
        }
        .good-price {
          color: #ff0000;
          font-size: 16px;
          line-height: 28px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }

  .pay-btn-wrap {
    width: 90%;
    margin: 0 auto;
    padding: 30px 0;
  }
}
</style>