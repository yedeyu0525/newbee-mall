<template>
  <ul id="tab-bar">
    <slot></slot>
  </ul>
</template>
<script>
export default {
}
</script>

<style lang="less" scoped>
  #tab-bar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 5px 0;
    box-sizing: border-box;
    background: #ffffff;
    border-top: 1px solid #f1f1f1;
    z-index: 999;
  }
</style>