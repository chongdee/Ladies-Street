<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="nav-bar" @titleclick="titleClick" />
    <scroll 
      class="wrapper" 
      ref="scroll" 
      @scroll="contentScroll"
      :probe-type = "3"

    >
      <!-- <div style="width:200px">
        <div v-for="item in $store.state.cartList" :key="item">
          {{item}}
        </div>
      </div> -->
      
      <detail-swiper :top-images="topImages"/>
      <detail-base-info class="base-info" :goods="goods" />
      <detail-shop-info class="shop-info" :shop="shop"/>
      <detail-goods-info class="goods-info" :detail-info="detailInfo" @detailimgload = "detailImgLoad"/>

      <detail-param-info class="params" ref="params" :param-info="paramInfo"/>
      <detail-comment-info class="comment" ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" class="goods-list"/>

      
    </scroll>

    <!-- 底部工具栏 -->
    <detail-bottom-bar @addtocart="addToCart"/>

    <!-- 回到顶部 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import DetailNavBar from "./detailComps/DetailNavBar";
import DetailSwiper from "./detailComps/DetailSwiper";
import DetailBaseInfo from "./detailComps/DetailBaseInfo";
import DetailShopInfo from "./detailComps/DetailShopInfo";
import DetailGoodsInfo from "./detailComps/DetailGoodsInfo";
import DetailParamInfo from "./detailComps/DetailParamInfo";
import DetailCommentInfo from "./detailComps/DetailCommentInfo";
import DetailBottomBar from "./detailComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";


import GoodsList from "components/content/goods/GoodsList";


import { getDetailData, Goods, Shop, GoodsParam, getRecommendData } from "network/detail";

import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";


export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeOffSetTopY: [],
      getThemeTopY: null,
      currentIndex: 0,

      // isShowBackTop: false
    }
  },
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
  },

  created () {
    this.iid = this.$route.params.iid

    // 请求产品详情数据
    this.getDetailData()

    // 请求推荐数据
    getRecommendData().then(res => {
      // console.log(res);
      this.recommends = res.data.list
      
    })

    this.getThemeTopY = debounce(() => {
      this.themeOffSetTopY = []
      this.themeOffSetTopY.push(0)
      this.themeOffSetTopY.push(this.$refs.params.$el.offsetTop)
      this.themeOffSetTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeOffSetTopY.push(this.$refs.recommend.$el.offsetTop)

      this.themeOffSetTopY.push(Number.MAX_VALUE)

      
      // console.log(this.themeOffSetTopY,'图片加载完成');
    }, 100)
  },
  
  methods: {
    // 请求产品详情数据
    getDetailData() {
      getDetailData(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        // 获取轮播图
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取商家店铺信息
        this.shop = new Shop(data.shopInfo)

        // 商品详情
        this.detailInfo = data.detailInfo

        // 获取参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 获取评论信息
        if (data.rate.rRte !== 0){
          this.commentInfo = data.rate.list[0]
        }
        

      })
    },

    
    

    // 监听产品详情图片加载完成
    detailImgLoad() {
      this.$refs.scroll.refresh()

      
      this.getThemeTopY()
    },

    // 监听标题导航事件
    titleClick(index) {
      // console.log(index);
      // 点击标题跳转到不同详情内容, 减44,是因为要减去 头部导航的高度
      this.$refs.scroll.scrollTo(0, -(this.themeOffSetTopY[index] - 44), 100)
    },
    // 内容滚动到那个内容，标题导航激活那个内容
    contentScroll(pos) {
      // console.log(pos);
      // 获取y值
      const posY = -pos.y

      let length = this.themeOffSetTopY.length
      for (let i = 0; i < length; i++) {
        
        if(this.currentIndex !==i && (posY > this.themeOffSetTopY[i] && posY < 
        
        this.themeOffSetTopY[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
        
      }

      this.isShowBackTop = Math.abs(pos.y) > 1000;
    },

    // 已用mixin混用首页的回到顶部组件
    // backTopClick() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // }

    // 加入购物车
    addToCart() {

      // 获取购物车需要的展示信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0];
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      console.log('加入购物车',product);
      
      // 将商品添加到购物车
      // this.$store.commit('addToCart', product)

      this.$store.dispatch('addToCart', product)

      this.$toast.show("加入购物车成功")
      // console.log(this.$toast);
      
    }
  }
}

</script>

<style lang="scss" scoped>
  #detail {
    position: relative;
    z-index: 99;
    .nav-bar{
      position: relative;
      z-index: 10;
      background-color: #fff;
    }
    .wrapper{
      height: calc(100vh - 94px);
    }

    .base-info,.shop-info, .goods-info, .goods-list, .params, .comment {
      background-color: #fff;
    }
  }
</style>