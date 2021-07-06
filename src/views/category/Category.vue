<template>
  <div>
    <nav-bar>
      <div slot="title">分类</div>
    </nav-bar>

    <main-tab-bar></main-tab-bar>
    <div class="search-wrap" ref="searchWrap">
      <div class="nav-side-wrapper">
        <list-scroll>
          <ul class="nav-side">
            <li
              v-for="item in categoryData"
              :key="item.categoryId"
              v-text="item.categoryName"
              :class="{ active: currentIndex == item.categoryId }"
              @click="selectMenu(item.categoryId)"
            ></li>
          </ul>
        </list-scroll>
      </div>

      <div class="search-content">
        <list-scroll>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in categoryData">
                <div
                  class="swiper-slide"
                  v-if="currentIndex == category.categoryId"
                  :key="index"
                >
                  <img
                    class="category-main-img"
                    :src="category.mainImgUrl"
                    v-if="category.mainImgUrl"
                  />
                  <div
                    class="category-list"
                    v-for="(products, index) in category.secondLevelCategoryVOS"
                    :key="index"
                  >
                    <p class="catogory-title">{{ products.categoryName }}</p>
                    <div
                      class="product-item"
                      v-for="(product, index) in products.thirdLevelCategoryVOS"
                      :key="index"
                      @click="selectProduct(product)"
                    >
                      <img
                        src="http://s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                        class="product-img"
                      />
                      <p
                        v-text="product.categoryName"
                        class="product-title"
                      ></p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </list-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory } from "service/good.js";
import listScroll from "components/common/listScroll/ListScroll";

export default {
  components: {
    listScroll,
  },
  data() {
    return {
      categoryData: [],
      currentIndex: 15,
    };
  },
  async mounted() {
    const { data } = await getCategory();
    this.categoryData = data;
  },
  
  methods: {
    selectMenu(id) {
      this.currentIndex = id;
    },
    selectProduct(item) {
      this.$router.push(`/product-list?categoryId=${item.categoryId}`)
    }
  },
};
</script>

<style lang="less" scoped>
.search-wrap {
  .fj();
  width: 100%;
  height: 100vh;
  padding-bottom: 50px;
  padding-top: 44px;
  background: #f8f8f8;
  border-top: 1px solid #999;
  .boxSizing();
  .nav-side-wrapper {
    width: 28%;
    height: 100%;
    .nav-side {
      width: 100%;
      background: #f8f8f8;
      li {
        width: 100%;
        height: 56px;
        text-align: center;
        line-height: 56px;
        font-size: 14px;
        &.active {
          color: @primary;
          background: #ffffff;
        }
      }
    }
  }
  .search-content {
    width: 72%;
    height: 100%;
    padding: 0 10px;
    background: #fff;
    .boxSizing();
    .category-list {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      width: 100%;
      .catogory-title {
        width: 100%;
        font-size: 17px;
        font-weight: 500;
        padding: 20px 0;
        margin: 0;
        text-align: center;
      }
      .product-item {
        width: 33.3333%;
        margin-bottom: 10px;
        text-align: center;
        font-size: 15px;
        .product-img {
          .wh(30px, 30px);
        }
      }
    }
  }
}
</style>