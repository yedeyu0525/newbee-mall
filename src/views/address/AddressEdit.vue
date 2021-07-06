<template>
  <div class="address-edit-box">
    <nav-bar>
      <i slot="left" class="iconfont icon-fanhui"></i>
      <div slot="title">{{ type == "add" ? "新增地址" : "编辑地址" }}</div>
    </nav-bar>
    <van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { tdist } from "common/js/utils";
import { addAddress, editAddress, getAddressDetail, delAddress } from "service/address";
export default {
  data() {
    return {
      areaList: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      searchResult: [],
      type: "add",
      addressId: "",
      from: "",
      addressInfo: {}
    };
  },
  async mounted() {
    // 省市区列表构造
    let _province_list = {};
    let _city_list = {};
    let _county_list = {};
    tdist.getLev1().forEach((p) => {
      _province_list[p.id] = p.text;
      tdist.getLev2(p.id).forEach((c) => {
        _city_list[c.id] = c.text;
        tdist.getLev3(c.id).forEach((q) => (_county_list[q.id] = q.text));
      });
    });
    this.areaList.province_list = _province_list;
    this.areaList.city_list = _city_list;
    this.areaList.county_list = _county_list;

    const { addressId, type, from } = this.$route.query;
    this.addressId = addressId;
    this.type = type;
    this.from = from;

    if (this.type == "edit") {
      const { data: addressDetail } = await getAddressDetail(addressId);
      let _areaCode = "";
      const province = tdist.getLev1();
      Object.entries(this.areaList.county_list).forEach(([id, text]) => {
        // 先找出当前对应的区
        if (text == addressDetail.regionName) {
          // 找到区对应的几个省份
          const provinceIndex = province.findIndex(
            (item) => item.id.substr(0, 2) == id.substr(0, 2)
          );
          // 找到区对应的几个市区
          const cityItem = Object.entries(this.areaList.city_list).filter(
            ([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4)
          )[0];
          // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
          if (
            province[provinceIndex].text == addressDetail.provinceName &&
            cityItem[1] == addressDetail.cityName
          ) {
            _areaCode = id;
          }
        }
      });
      this.addressInfo = {
        id: addressDetail.addressId,
        name: addressDetail.userName,
        tel: addressDetail.userPhone,
        province: addressDetail.provinceName,
        city: addressDetail.cityName,
        county: addressDetail.regionName,
        addressDetail: addressDetail.detailAddress,
        areaCode: _areaCode,
        isDefault: !!addressDetail.defaultFlag,
      };
    }
  },
  methods: {
    async onSave(content) {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0,
      };
      if (this.type == "edit") {
        params.addressId = this.addressId;
      }
      const { message } = await this.type  == "add" ? addAddress(params) : editAddress(params);
      Toast({
        message: "保存成功",
        duration: 800
      });
      setTimeout(() => {
        this.$router.replace(`address?from=${this.from}`);
      }, 1000);
    },
    async onDelete() {
      const { data } = await delAddress(this.addressId) 
      Toast({
        message: "删除成功",
        duration: 800
      });
      setTimeout(() => {
        this.$router.replace(`address?from=${this.from}`);
      }, 1000);
    }
  },
};
</script>

<style lang="less" scoped>
.address-edit-box {
  .edit {
    margin-top: 44px;
  }
  /deep/ .van-button--danger {
    background: @primary;
    border-color: @primary;
  }
}
</style>