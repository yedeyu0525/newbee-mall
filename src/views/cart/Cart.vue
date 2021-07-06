<template>
  <div class="cart-box">
    <nav-bar>
      <div slot="title">购物车</div>
    </nav-bar>

    <div class="cart-body">
      <van-checkbox-group @change="groupChange" v-model="result">
        <van-swipe-cell
          right-width="50"
          v-for="item in list"
          :key="item.cartItemId"
        >
          <div class="good-item">
            <van-checkbox :name="item.cartItemId"></van-checkbox>
            <div class="good-img">
              <img :src="prefix(item.goodsCoverImg)" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.sellingPrice }}</div>
                <van-stepper
                  integer
                  :min="1"
                  :value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <van-button
            slot="right"
            square
            icon="delete"
            type="danger"
            class="delete-button"
            @click="deleteGood(item.cartItemId)"
          />
        </van-swipe-cell>
      </van-checkbox-group>
    </div>

    <van-submit-bar
      v-if="list.length"
      class="submit-all"
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkAll" @click="allCheck">全选</van-checkbox>
    </van-submit-bar>

    <div class="empty" v-if="!list.length">
      <van-icon name="smile-o" />
      <div class="title">购物车空空如也</div>
      <van-button type="primary" color="#1baeae" block replace to="/home">前往首页</van-button>
    </div>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import { getCart, modifyCart, delCartItem } from "service/cart";
import { Toast } from "vant";
export default {
  data() {
    return {
      list: [], // 列表数据
      result: [], // 复选框的集合(ID)
      checkAll: true, // 是否全选
    };
  },
  computed: {
    /**
     * 总金额
     * 1.过滤出选中的商品
     * 2.把过滤出的商品金额相加
     * 3.返回总金额
     * */
    total() {
      let price = 0;
      let _list = this.list.filter((item) => {
        return this.result.includes(item.cartItemId);
      });
      _list.forEach((item) => {
        price += item.sellingPrice * item.goodsCount;
      });
      return price;
    },
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    async init() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const { data } = await getCart({ pageNumber: 1 });
      this.list = data;
      this.result = data.map((item) => item.cartItemId);
      Toast.clear();
    },
    /**
     * 结算
     * 1.判断是否有选中商品，如果没有则 return 终止
     * 2.将this.result转成字符串
     * 3.携带参数跳转到创建订单页
     * */
    onSubmit() {
      if (this.result.length == 0) {
        Toast.fail("请选择商品进行结算");
        return;
      }
      const params = JSON.stringify(this.result);
      this.$router.push({ path: `create-order?cartItemIds=${params}` })
    },
    /**
     * 商品数量改变
     * 1.判断商品改变前的数量是否与改变后的数量相等，如果相等则 return 终止
     * 2.请求改变
     * 3.给改变商品的数量赋值
     * */
    async onChange(value, detail) {
      let item = this.list.filter((item) => item.cartItemId == detail.name);
      if (item[0].goodsCount == value) return;
      Toast.loading({ message: "修改中...", forbidClick: true });
      const params = {
        cartItemId: detail.name,
        goodsCount: value,
      };
      const { data } = await modifyCart(params);
      this.list.forEach((item) => {
        if (item.cartItemId == detail.name) {
          item.goodsCount = value;
        }
      });
      Toast.clear();
    },
    /**
     * 删除购物车商品
     * */
    async deleteGood(id) {
      const { data } = await delCartItem(id);
      this.$store.dispatch("updateCart");
      this.init();
    },
    // 商品复选框改变
    groupChange(result) {
      if (result.length == this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      this.result = result;
    },
    // 全选点击
    allCheck(value) {
      if (this.checkAll) {
        this.result = [];
      } else {
        this.result = this.list.map((item) => item.cartItemId);
      }
    },
  },
};
</script>

<style lang="less">
.cart-box {
  .cart-body {
    margin-top: 60px;
    margin-bottom: 100px;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          .wh(100px,100px);
        }
      }
      .good-desc {
        .fj();
        flex-direction: column;
        flex: 1;
        padding: 20px;
        .good-title {
          .fj();
        }
        .good-btn {
          .fj();
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      height: 100%;
    }
  }

  .submit-all {
    margin-bottom: 50px;
    .van-submit-bar__button {
      background: @primary;
    }
  }
  .empty {
    width: 50%;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>