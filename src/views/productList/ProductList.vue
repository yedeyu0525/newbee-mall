<template>
  <div class="product-list-wrap">
    <div class="product-list-header">
      <header>
        <van-icon
          name="fanhui"
          class-prefix="icon"
          class="iconfont"
          @click="goBack()"
        />
        <van-search
          v-model="keyword"
          show-action
          placeholder="请输入搜索关键词"
        >
          <template #action>
            <van-button size="small" color="#1baeae" @click="onSearch"
              >搜索</van-button
            >
          </template>
        </van-search>
      </header>
      <van-tabs type="card" @click="changeTab" color="#1baeae">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>

    <div class="ban product-list-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @offset="300"
          @load="loadingMore"
          class="product-list"
        >
          <div
            class="product-item"
            v-for="item in productList"
            :key="item.goodsId"
            @click="productDetail(item)"
          >
            <img :src="prefix(item.goodsCoverImg)" />
            <div class="product-info">
              <p class="name">{{ item.goodsName }}</p>
              <p class="subtitle">{{ item.goodsIntro }}</p>
              <span class="price">￥ {{ item.sellingPrice }}</span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { search } from "service/good";
import { Toast } from "vant";

export default {
  data() {
    return {
      keyword: "", //搜索关键字
      loading: false, //是否加载状态
      finished: false, //是否加载完成
      refreshing: false, //是否下拉刷新状态
      page: 1,
      orderBy: "", //tab类型
      productList: [],
      totalPage: 0,
      offset: 300,
    };
  },
  methods: {
    // 跳转到详情页
    productDetail(item) {
      this.$router.push(`/product/${item.goodsId}`);
    },
    /**
     * 初始化
     * 1.判断参数ID跟关键字是否为空(如果都为空则 return 终止)
     * 2.发起网络请求
     * 3.判断当前页数是否大于等于总页数(如果大于等于则说明加载完了 把finished改成true)
     */
    async init() {
      const { categoryId } = this.$route.query;
      if (!categoryId && !this.keyword) {
        Toast.fail("请输入关键词");
        this.finished = true;
        this.loading = false;
        this.refreshing = false;
        return;
      }
      const { data } = await search({
        pageNumber: this.page,
        goodsCategoryId: categoryId,
        keyword: this.keyword,
        orderBy: this.orderBy,
      });
      this.productList = this.productList.concat(data.list);
      this.totalPage = data.totalPage;
      this.loading = false;
      if (this.page >= data.totalPage) this.finished = true;
    },
    // 搜索触发
    onSearch() {
      this.onRefresh();
    },
    /**
     * 加载更多(首次进入会触发一次)
     * 1.滚动条与底部距离小于 offset 时触发
     * 2.判断页数是否需要增加(条件：非下拉触发且当前页数小于总页数)
     * 3.判断是否为上拉刷新（如果是则清空产品列表）
     */
    loadingMore() {
      if (!this.refreshing && this.page < this.totalPage) {
        this.page += 1;
      }
      if (this.refreshing) {
        this.productList = [];
        this.refreshing = false;
      }
      this.loading = true;
      this.init();
    },
    //下拉触发
    onRefresh() {
      this.finished = false;
      this.refreshing = true;
      this.page = 1;
      this.loadingMore();
    },
    //tab点击触发
    changeTab(name) {
      this.orderBy = name;
      this.onRefresh();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.product-list-wrap {
  .product-list-header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
    background: #ffffff;
    header {
      display: flex;
      align-items: center;
      padding: 0 15px;
      .van-search {
        flex: 1 1;
      }
    }
  }
  .product-list-content {
    margin-top: 80px;
    height: calc(100vh - 80px);
    .van-pull-refresh{
      min-height: 100%;
    }
    .product-list {
      .product-item {
        .fj();
        width: 100%;
        height: 120px;
        padding: 10px 0;
        border-bottom: 1px solid #dcdcdc;
        img {
          width: 140px;
          height: 120px;
          padding: 0 10px;
          .boxSizing();
        }
        .product-info {
          width: 56%;
          height: 100%;
          padding: 5px;
          .boxSizing();
          p {
            margin: 0;
          }
          .name {
            width: 100%;
            line-height: 20px;
            font-size: 15px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .subtitle {
            width: 100%;
            max-height: 20px;
            padding: 10px 0;
            line-height: 25px;
            font-size: 13px;
            color: #999;
            overflow: hidden;
          }
          .price {
            color: @primary;
            font-size: 16px;
          }
        }
      }
    }
  }
  .van-button--small {
    min-width: auto;
  }
}
</style>