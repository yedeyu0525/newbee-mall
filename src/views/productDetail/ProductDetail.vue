<template>
  <div class="product-detail">
    <nav-bar>
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">商品详情</div>
    </nav-bar>

    <div class="detail-content">
      <van-swipe class="my-swipe" indicator-color="#1baeae">
        <van-swipe-item
          v-for="(item, index) in detail.goodsCarouselList"
          :key="index"
        >
          <img :src="prefix(item)" alt="" />
        </van-swipe-item>
      </van-swipe>

      <div class="product-info">
        <div class="product-title">{{ detail.goodsName }}</div>
        <div class="product-desc">{{ detail.goodsIntro }}（邮费 顺丰快递）</div>
        <div class="product-price">
          <span>¥{{ detail.sellingPrice }}</span>
        </div>
      </div>

      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <p class="product-content" v-html="detail.goodsDetailContent"></p>
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" :info="count" text="购物车" to="/cart"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="goToCart" />
    </van-goods-action>
  </div>
</template>

<script>
import { getDetail } from "service/good";
import { addCart } from "service/cart"
import { Toast } from "vant";
export default {
  data() {
    return {
      detail: {},
    };
  },

  computed: {
    count() {
      return this.$store.state.cartCount;
    }
  },

  async mounted() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
    });
    const { id } = this.$route.params;
    this.$store.dispatch("updateCart");
    const { data } = await getDetail(id);
    this.detail = data;
    Toast.clear();
  },
  methods: {
    async addCart() {
      let params = {
        goodsCount: 1,
        goodsId: this.detail.goodsId
      }
      const { resultCode } = await addCart(params)
      if (resultCode == 200 ) Toast.success('添加成功')
      this.$store.dispatch('updateCart')
    },
    async goToCart() {
      let params = {
        goodsCount: 1,
        goodsId: this.detail.goodsId
      }
      const { resultCode } = await addCart(params)
      this.$store.dispatch('updateCart')
      this.$router.push({ path: '/cart' })
    }
  },
};
</script>

<style lang="less" >
.product-detail {
  .detail-content {
    margin-top: 44px;
    margin-bottom: 50px;
    .my-swipe {
      img {
        width: 100%;
      }
    }

    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        color: #333;
      }

      .product-desc {
        font-size: 14px;
        color: #999;
        padding: 5px 0;
      }

      .product-price {
        .fj();

        span:nth-of-type(1) {
          color: #f63515;
          font-size: 22px;
        }

        span:nth-of-type(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }

    .product-intro {
      width: 100%;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;

        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          &:last-of-type {
            border-right: none;
          }
        }
      }

      .product-content {
        padding: 0 20px;

        img {
          width: 100%;
        }
      }
    }
  }
  
  .van-goods-action-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }

  .van-goods-action-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>