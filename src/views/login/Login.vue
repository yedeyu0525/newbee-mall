<template>
  <div class="login">
    <nav-bar>
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">{{ title }}</div>
    </nav-bar>
    <img
      class="logo"
      src="http://s.weituibao.com/1582958061265/mlogo.png"
      alt=""
    />
    <div class="from-container">
      <van-form @submit="onSubmit">
        <van-field
          name="用户名"
          label="用户名"
          placeholder="用户名"
          v-model="username"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          v-model="password"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="verify">
          <Verify
            ref="loginVerifyRef"
            @error="error"
            :showButton="false"
            @success="success"
            :fontSize="'16px'"
            :type="2"
          ></Verify>
        </div>
        <div style="margin: 16px">
          <div
            class="link"
            @click="toggle(type == 'login' ? 'register' : 'login')"
          >
            {{ type == "login" ? "立即注册" : "已有登录账号" }}
          </div>
          <van-button round block type="info" native-type="submit">{{
            title
          }}</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Verify from "vue2-verify";
import { Toast } from "vant";
import { login, register } from 'service/user.js'
import { setLocal, getLocal } from 'common/js/utils'
export default {
  data() {
    return {
      type: "login",
      username: "",
      password: "",
      verify: "",
    };
  },
  components: {
    Verify,
  },
  computed: {
    isLogin() {
      return this.type == "login" ? true : false;
    },
    title() {
      return this.isLogin ? "登录" : "注册";
    },
  },
  methods: {
    dealTriVer() {
      // 执行验证码的验证，通过 this.verify 知道验证码是否填写正确
      this.$refs.loginVerifyRef.$refs.instance.checkCode();
    },
    // 登录注册状态切换并清空信息
    toggle(value) {
      this.type = value;
      this.username = "";
      this.password = "";
      this.verify = false;
      this.$refs.loginVerifyRef.$refs.instance.refresh();
    },
    async onSubmit() {
      this.dealTriVer();
      if (!this.verify) {
        Toast.fail("验证码未填或填写错误!");
        return;
      }
      if (this.isLogin) {
        const res = await login({
          loginName: this.username,
          passwordMd5: this.$md5(this.password)
        })
        setLocal('token',res.data);
        window.location.href = '/';
      } else {
        let res = await register({
          loginName: this.username,
          password : this.password
        })
        this.type = "login";
        this.username = "";
        this.password = "";
        this.verify = false;
      }
    },
    success(obj) {
      this.verify = true;
      // 回调之后，刷新验证码
      obj.refresh();
    },
    error(obj) {
      this.verify = false;
      // 回调之后，刷新验证码
      obj.refresh();
    },
  },
};
</script>

<style lang="less" >
.login {
  .logo {
    width: 120px;
    height: 120px;
    margin: 80px auto 0px;
    display: block;
  }

  .from-container {
    padding: 0 20px;

    .link {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }

  .verify {
    display: flex;
    justify-content: center;
    > div {
      width: 100%;
    }
    .cerify-code-panel {
      margin-top: 16px;
    }
    .verify-code {
      width: 40% !important;
      height: 40px !important;
      line-height: 40px !important;
      float: left !important;
    }
    .verify-code-area {
      width: 54% !important;
      height: 40px !important;
      line-height: 40px !important;
      float: left !important;
      margin-left: 14px !important;
      .boxSizing();
      .varify-input-code {
        width: 90px;
        height: 38px !important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }
      .verify-change-area {
        line-height: 40px;
      }
    }
  }
}
</style>