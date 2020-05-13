<template>
  <div id="home">
    <!-- 头部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">女人街</div>
    </nav-bar>

    <tabs
      class="tabs-contl"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabContl1"
      v-show="isTabFixed"
    >
    </tabs>

    <!-- better-scroll插件封装 -->
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      @scroll="onScroll"
      @pullupload="pulluploadMore"
      :probe-type="3"
      :pull-up-load="true"
    >
      <!-- 轮播图组件 -->
      <home-swiper
        :banner="banner"
        @swiperimgload="SwiperImgLoad"
      ></home-swiper>
      <!-- 热门推荐 -->
      <home-recommend :recommend="recommend"></home-recommend>
      <!-- 产品特色 -->
      <home-feature></home-feature>
      <!-- tabs选项 -->
      <tabs
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabContl2"
        class="tabs-contl"
      >
      </tabs>

      <!-- 产品列表 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 返回顶部 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Tabs from "components/content/tabs/Tabs";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./homeComps/HomeSwiper";
import HomeRecommend from "./homeComps/HomeRecommend";
import HomeFeature from "./homeComps/HomeFeature";

import { getHomeData, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    Tabs,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },

      currentType: "pop",

      isShowBackTop: false,

      tabOffsetTop: 0,

      isTabFixed: false,
      // 获取滚动y轴坐标
      saveY: 0
    };
  },

  created() {
    // 请求轮播图
    this.getHomeData();

    // 请求商品列表数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 监听goodslistitem图片加载完成
    // 滚动节流函数
    const refresh = this.throttle(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemimgload", () => {
      // console.log("监听goodsitemimg");
      // this.$refs.scroll.refresh()
      refresh();
    });
  },
  destroyed() {
    // 当设置keep-alive组件，此钩子函数不会执行，会执行activated与deactivated
    console.log("home销毁");
  },
  activated() {
    // 点击tabbar跳转其他页回来时候记录首页滚动位置
    // console.log('activated');
    this.$refs.scroll.scrollTo(0, this.saveY);

    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY();
  },

  methods: {
    /* ------------------------- 网络请求 ---------------------- */
    getHomeData() {
      getHomeData().then(res => {
        // console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    // 获取商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
        this.$refs.scroll.finishPullUp();
      });
    },

    /*------------------------- 事件方法 ---------------------- */
    /* 
    节流（throttle）:而函数节流是间隔时间执行，监听滚动事件，应用：比如是否滑到底部自动加载更多，用throttle来判断
    防抖（debounce）函数防抖是某一段时间内只执行一次 ，应用：输入框搜索
    
    */
    throttle(fn, delay) {
      let canRun = true; // 通过闭包保存一个标记
      return function() {
        // 在函数开头判断标记是否为true，不为true则return
        if (!canRun) return;
        // 立即设置为false
        canRun = false;
        // 将外部传入的函数的执行放在setTimeout中
        setTimeout(() => {
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
          // 当定时器没有执行的时候标记永远是false，在开头被return掉
          fn.apply(this, arguments);
          canRun = true;
        }, delay);
      };
    },

    // 点击tabs切换内容
    tabClick(index) {
      // console.log(index);

      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      // 根据currentIndex选中样式
      this.$refs.tabContl1.currentIndex = index;
      this.$refs.tabContl2.currentIndex = index;

      // console.log(this.$refs.tabContl1);
    },

    // 回到顶部
    backTopClick() {
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听滚动事件，控制backtop显示或隐藏
    onScroll(pos) {
      // console.log(pos);
      this.isShowBackTop = Math.abs(pos.y) > 1000;

      // 滚动事件决定tabcontrol是否吸顶
      this.isTabFixed = Math.abs(pos.y) > this.tabOffsetTop;
    },
    // 下拉加载更多事件
    pulluploadMore() {
      this.getHomeGoods(this.currentType);
    },

    // 监听轮播图的图片加载事件
    SwiperImgLoad() {
      // 获取tab offsetTop
      this.tabOffsetTop = this.$refs.tabContl2.$el.offsetTop;
    }
  }
};
</script>

<style lang="scss" scoped>
.home-nav {
  position: relative;
  z-index: 10;
  background-color: var(--color-tint);
  color: #fff;
}

.tabs-contl {
  background-color: #fff;
  position: relative;
  z-index: 10;
}

.scroll-wrapper {
  height: calc(100vh - 94px);

  // overflow: hidden;
  // position: absolute;
  // top: 45px;
  // bottom: 49px;
  // left: 0;
  // right: 0;
}
</style>
