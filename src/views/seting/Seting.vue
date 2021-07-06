<template>
  <div class="seting-box">
    <nav-bar>
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">账号管理</div>
    </nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        label="昵称"
        placeholder="请输入昵称"
        v-model="nickName"
        :rules="[{ required: true, message: '昵称不能为空' }]"
      />
      <van-field
        label="个性签名"
        placeholder="请输入个性签名"
        v-model="introduceSign"
      />
      <van-field
        type="password"
        label="修改密码"
        placeholder="请输入新密码"
        v-model="password"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
        <van-button block type="info" native-type="button" @click="logout">退出登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getUserInfo,edifUserInfo,logout } from "service/user";
import { setLocal } from 'common/js/utils'
import { Toast } from 'vant';
export default {
  data() {
    return {
      password: "",
      nickName: "",
      introduceSign: "",
    };
  },
  async mounted() {
    const { data } = await getUserInfo();
    this.nickName = data.nickName;
    this.introduceSign = data.introduceSign;
  },
  methods: {
    // 保存
    async onSubmit() {
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        password: this.$md5(this.password)
      }
      await edifUserInfo(params)
      Toast.success('保存成功')
    },
    // 退出
    async logout() {
      const { resultCode } = await logout()
      if(resultCode == 200) {
        setLocal('token','')
        window.location.href = '/';
      }
    }
  },
};
</script>

<style lang="less" scoped>
.seting-box {
  .van-form {
    margin-top: 44px;
  }
}
</style>