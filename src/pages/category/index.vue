<template>
  <div>
    <!-- 搜索 -->
    <search></search>
    <!-- 分类 -->
    <div class="category">
      <!-- 左侧父级分类 -->
      <ul class="parent-cat">
        <scroll-view scroll-y>
          <li :class="{active: isShowActive === i}" v-for="(item,i) in categoryList" :key="item.cat_id"
          @click="handleLiSelected(i)"
          >{{item.cat_name}}</li>
        </scroll-view>
      </ul>
      <!-- 右侧子级分类 -->
      <div class="child-cat">
        <scroll-view scroll-y>
          <image src="/static/uploads/category.png"></image>
          <div class="product" v-for="item in childList" :key="item.cat_id">
            <div class="title">{{item.cat_name}}</div>
            <div class="brand">
              <a href="" v-for="(item2,i) in item.children" :key="i">
                <image :src="item2.cat_icon"></image>
                <div class="brand-title">{{item2.cat_name}}</div>
              </a>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/search'
import request from '@/utils/request'
export default {
  data() {
    return {
      categoryList: [],
      isShowActive: 0
    }
  },
  computed: {
    childList () {
      return this.categoryList.length && this.categoryList[this.isShowActive].children
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    // 获取分类数据
    async getCategory () {
      const {message, meta} = await request({
        url: '/api/public/v1/categories'
      })
      // console.log(message)
      this.categoryList = message
    },
    // 确定侧边栏中选中的是哪个li
    handleLiSelected (index) {
      this.isShowActive = index
    }
  },
  components: {
    search
  }
}
</script>

<style scoped lang="less">
.category{
  margin-top: 100rpx;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  .parent-cat{
    width: 198rpx;
    height: 100%;
    background-color: #f4f4f4;
    scroll-view{
      height: 100%;
      li{
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        font-size: 27rpx;
        border-bottom: 1rpx solid #eee;
        position: relative;
      }
      li.active{
        background-color: #fff;
        color: #ea4451;
        &::after{
          content: '';
          display: block;
          width: 8rpx;
          height: 60rpx;
          background-color: #ea4451;
          position: absolute;
          top: 50%;
          left: 0;
          margin-top: -30rpx;
        }
      }
    }
  }
  .child-cat{
    flex: 1;
    height: 100%;
    padding:16rpx;
    scroll-view{
      height: 100%;
      image{
        width: 100%;
        height: 180rpx;
      }
      .product{
        text-align: center;
        padding: 40rpx 0;
        .title{
          font-size: 28rpx;
          &::after{
            content: '/';
            color: #eee;
            margin-left: 30rpx;
          }
          &::before{
            content: '/';
            color: #eee;
            margin-right: 30rpx;
          }
        }
        .brand{
          display: flex;
          flex-wrap: wrap;
          a{
            display: block;
            width: 33.333%;
            image{
              margin: 20rpx 0;
              width: 120rpx;
              height: 120rpx;
            }
            .brand-title{
              font-size: 24rpx;
            }
          }
        }
      }
    }
  }
}
</style>
