<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  components: {},

  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true, //滚动内容有点击事件，设置为true
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", pos => {
        this.$emit("scroll", pos);
      });
    }

    // 监听滚到底部上拉下载事件
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      this.$emit("pullupload");
    });
  },

  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    refresh() {
      this.scroll.refresh();
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style lang="scss" scoped></style>
