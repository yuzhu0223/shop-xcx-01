<template>
  <div class="index-container">
    <!-- 顶部 -->
    <div class="header">
      <!-- 搜索区域 -->
      <div class="search">
        <input type="text" placeholder="请输入搜索商品">
      </div>
      <!-- 搜索结果 -->
      <div class="result"></div>
    </div>
    <!-- 轮播图 -->
    <swiper class="banner"
      indicator-dots indicator-color="rgbaa(255,255,255,.6)" indicator-active-color="#fff" autoplay interval="2000" circular>
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator :url="item.navigator_url">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航分类 -->
    <div class="navs">
      <navigator :url="item.navigator_url" v-for="(item, i) in navList" :key="i">
        <image :src="item.image_src"></image>
      </navigator>
    </div>
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" v-for="(item1,i) in floorList" :key="i">
        <div class="title">
          <image :src="item1.floor_title.image_src"></image>
        </div>
        <div class="qita">
          <navigator :url="item2.navigator_url" v-for="(item2,index) in item1.product_list" :key="index">
            <image :src="item2.image_src"></image>
          </navigator>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <span class="gotop" v-show="isShow" @click="goTop">顶部</span>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data () {
    return {
      swiperList: [],
      navList: [],
      floorList: [],
      isShow: false
    }
  },
  mounted() {
    this.getSwiper()
    this.getNavs()
    this.getFools()
  },
  methods: {
    // 轮播图
    async getSwiper () {
      const {message,meta} = await request({
        url:'/api/public/v1/home/swiperdata'
      })
      // console.log(message,meta)
      if (meta.status === 200) {
        this.swiperList = message
      }
    },
    // 导航分类
    async getNavs () {
      const {message,meta} = await request({
        url:'/api/public/v1/home/catitems'
      })
      // console.log(message,meta)
      if (meta.status === 200) {
        this.navList = message
      }
    },
    // 楼层
    async getFools () {
      const {message,meta} = await request({
        url:'/api/public/v1/home/floordata'
      })
      // console.log(message,meta)
      if (meta.status === 200) {
        this.floorList = message
      }
    },

     // 回到顶部:调用api--将页面滚动到目标位置
    goTop () {
      mpvue.pageScrollTo ({
        scrollTop: 0
      })
    }
  },

  // 下拉刷新
  onPullDownRefresh () {
    this.getSwiper()
    this.getNavs()
    this.getFools()
    // 请求完成，停止刷新
    wx.stopPullDownRefresh()
  },

  // 上拉触底
  onReachBottom () {
    console.log('上拉触底')
  },

  // 监听用户滑动页面事件
  onPageScroll (e) {
    // console.log(e)
    this.isShow = e.scrollTop >= 200
  }
}
</script>

<style scoped lang="less">
  .index-container{
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
    // 轮播图
    .banner{
      width: 750rpx;
      height: 340rpx;
      navigator{
        width: 100%;
        height: 100%;
      }
    }
    // 导航分类
    .navs{
      display: flex;
      justify-content: space-between;
      padding: 30rpx 40rpx;
      navigator{
        width: 128rpx;
        height: 140rpx;
      }
    }
    // 楼层
    .floors{
      .floor{
        padding-top: 30rpx;
        background-color: #f4f4f4;
        padding-bottom: 20rpx;
        .title{
          width: 100%;
          height: 60rpx;
        }
        .qita{
          overflow: hidden;
          navigator{
            height: 188rpx;
            width: 30%;
            float: left;
            padding: 16rpx 0 0 18rpx;
          }
          navigator:first-child{
            height: 390rpx;
          }
        }
      }
    }
    .gotop{
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
      background-color: #fff;
      color: #666666;
      font-size: 25rpx;
      text-align: center;
      line-height: 88rpx;
      position: fixed;
      right: 10rpx;
      bottom: 20rpx;
    }

  }
</style>
