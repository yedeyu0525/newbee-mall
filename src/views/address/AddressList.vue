<template>
  <div class="address-box">
    <nav-bar>
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">地址管理</div>
    </nav-bar>
    <div class="address-list">
      <van-address-list
        v-if="from != 'mine'"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="select"
      />
      <van-address-list
        v-else
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import { getAddress } from 'service/address'
export default {
  data() {
    return {
      chosenAddressId: '1',
      list: [],
      from: this.$route.query.from
    };
  },
  async mounted() {
    const {data} = await getAddress()
    this.list = data.map(item => {
      return {
        id: item.addressId,
        name: item.userName,
        tel: item.userPhone,
        address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
        isDefault: !!item.defaultFlag
      }
    })
  },
  methods: {
    onAdd() {
      this.$router.push(`address-edit?type=add&from=${this.from}`)
    },
    onEdit(item) {
      this.$router.push(`address-edit?type=edit&addressId=${item.id}&from=${this.from}`)
    },
    select(item) {
      this.$router.replace(`create-order?addressId=${item.id}`)
    }
  },
};
</script>

<style lang="less" scoped>
.address-box {
  .address-list {
    margin-top: 44px;
    /deep/ .van-radio__icon {
      display: none;
    }
    .van-button {
      background: @primary;
      border-color: @primary;
    }
  }
}
</style>