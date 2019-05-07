<template>
  <!-- 顶部 -->
  <div class="header">
    <!-- 搜索区域 -->
    <div class="search">
      <input type="text" placeholder="请输入搜索商品">
    </div>
    <!-- 搜索结果 -->
    <div class="result"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
  // 顶部
  .header{
      background-color: #ff2d4a;
      padding: 20rpx 16rpx;
      width: 100%;
      box-sizing: border-box;
      input{
        width: 100%;
        height: 60rpx;
        background-color: #fff;
        font-size: 24rpx;
        padding-left: 15rpx;
        box-sizing: border-box;
        border-radius: 10rpx;
      }
  }
</style>
