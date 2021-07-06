<template>
  <div class="user">
    <nav-bar>
      <div slot="title">我的</div>
    </nav-bar>
    <div class="user-info">
      <div class="info">
        <img
          src="http://s.weituibao.com/1583583975067/user-graduate%20(1).png"
        />
        <div class="user-desc">
          <span>昵称：{{ user.nickName }}</span>
          <span>登录名：{{ user.loginName }}</span>
          <span>个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
    </div>
    <div class="user-list">
      <van-cell title="我的订单" is-link to="order" />
      <van-cell title="账号管理" is-link to="seting" />
      <van-cell title="地址管理" is-link to="address?from=mine" />
      <van-cell title="关于我们" is-link to="about" />
    </div>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import { getUserInfo } from "service/user";
export default {
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    const { data } = await getUserInfo();
    this.user = data;
  }
};
</script>

<style lang="less" scoped>
.user {
  .user-info {
    width: 94%;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    margin: 0 auto;
    margin-top: 50px;
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;
    .info {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();
      img {
        .wh(60px,60px);
        flex-shrink: 0;
        border-radius: 50%;
      }
      .user-desc {
        flex: 1 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 10px;
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .user-list {
    margin-top: 20px;
    .van-cell::after {
      right: 16px;
      border-bottom: 1px solid #e9e9e9;
      transform: scale(1);
    }
  }
}
</style>