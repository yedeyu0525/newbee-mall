<template>
  <li class="tab-bar-item" :style="activeStyle" @click="itemClick">
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: {
    path:{
      type: String
    },
    activeColor: {
      type: String,
      default: '#1baeae'
    }
  },
  computed:{
    isActive(){
      return this.$route.path === this.path;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods:{
    itemClick() {
      if(this.isActive) return
      this.$router.replace(this.path)
    }
  }
};
</script>

<style lang="less" scoped>
.tab-bar-item {
  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  i {
    font-size: 22px;
  }

  span{
    font-size: 12px;
  }
}
</style>