<template>
  <!-- 顶部 -->
  <div class="search" :class="{focused: focused}">
    <!-- 搜索区域 -->
    <div class="input-box">
      <input type="text"
      :placeholder="placeholder"
      @focus="handleFocus"
      v-model="searchText"
      @input="handleSearch"
      >
      <span @click="cancelSearch">取消</span>
    </div>
    <!-- 搜索展示 -->
    <div class="content">
      <!-- 搜索历史标题 -->
      <div class="title">搜索历史
        <span class="clearHistory"></span>
      </div>
      <!-- 搜索历史记录 -->
      <div class="history">
        <a href="">小米</a>
        <a href="">小米智能电视</a>
        <a href="">小米空气净化器</a>
        <a href="">西门子洗碗机</a>
        <a href="">华为手机</a>
        <a href="">苹果</a>
        <a href="">锤子</a>
      </div>
      <!-- 搜索结果展示 -->
      <div class="result" v-show="searchList.length">
        <scroll-view scroll-y>
          <a href="" v-for="item in searchList" :key="item.goods_id">{{item.goods_name}}</a>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {
      placeholder: '',
      focused: false,
      searchList: [],
      searchText: ''
    }
  },
  methods: {
    // 点击搜索框聚焦
    handleFocus () {
      this.focused = true
      this.placeholder = '请输入搜索商品'
    },
    // 点击取消按钮，取消搜索
    cancelSearch () {
      this.focused = false
      this.placeholder = '',
      this.searchText = '',
      this.searchList = []
    },
    // 发送搜索请求
    async handleSearch () {
      // 输入检测
      if (!this.searchList) return this.searchList = []
      // 发送请求
      const {message, meta} = await request({
        url: '/api/public/v1/goods/qsearch',
        data: {
          query: this.searchText
        }
      })
      // console.log(message)
      if (meta.status === 200) {
        this.searchList = message
      }
    }

  },
}
</script>

<style scoped lang="less">
  // 顶部搜索
  .search{
      .input-box{
        background-color: #ff2d4a;
        padding: 20rpx 16rpx;
        display: flex;
        position: relative;
        input{
          width: 100%;
          height: 60rpx;
          background-color: #fff;
          font-size: 24rpx;
          padding-left: 75rpx;
          box-sizing: border-box;
          border-radius: 10rpx;
          flex: 1;
        }
        span{
          display: none;
          width: 80rpx;
          font-size: 24rpx;
          color: #666;
          text-align: right;
          line-height: 60rpx;
        }
        &::after{
          content: '搜索';
          font-size: 24rpx;
          color: #666;
          padding-left: 60rpx;
          display: block;
          width: 60rpx;
          height: 44rpx;
          line-height: 44rpx;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/icon_search%402x.png);
          background-repeat: no-repeat;
          background-size: 44rpx;
        }
        &::before{
          display: none;
          content: '';
          width: 44rpx;
          height: 44rpx;
          position: absolute;
          top: 50%;
          margin-top: -22rpx;
          left: 40rpx;
          background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/icon_search%402x.png);
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
      .content{
        display: none;
      }
      &.focused{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        display: flex;
        flex-direction: column;
        .input-box{
          background-color: #eee;
          height: 50rpx;
          span{
            display: block;
          }
          &::after{
            display: none;
          }
          &::before{
            display: block;
          }
        }
        .content{
          display: block;
          background-color: #fff;
          flex: 1;
          padding: 20rpx;
          position: relative;
          .title{
            font-size: 30rpx;
            padding-bottom: 20rpx;
            .clearHistory{
              display: block;
              width: 27rpx;
              height: 27rpx;
              float: right;
              background-image: url(https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/clear.png);
              background-repeat: no-repeat;
              background-size: cover;
            }
          }
          .history{
            display: flex;
            flex-wrap: wrap;
            a{
              margin-top: 10rpx;
              color: #333;
              background-color: #ddd;
              padding: 10rpx 20rpx;
              margin-right: 15rpx;
              font-size: 24rpx;
            }
          }
          .result{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #fff;
            scroll-view{
              height: 100%;
              a{
                display: block;
                border-bottom: 1px solid #eee;
                font-size: 24rpx;
                padding: 15rpx 20rpx;
              }
            }
          }
        }
      }

  }
</style>
