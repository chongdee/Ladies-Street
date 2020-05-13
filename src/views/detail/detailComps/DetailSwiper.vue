<template>
  <div class="page">
    <swiper class="swiper-box" ref="mySwiper" :options="swiperOptions">
      <swiper-slide class="swiper-item" v-for="item in topImages" :key="item">
        <img :src="item" alt=""/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        // Some Swiper option/callback...
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        loop : true
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>

<style lang="scss" scoped>
.swiper-box{
  
  height: 300px;
  overflow: hidden;
  .swiper-item{
    // display: flex;
    // justify-content: center;
 
    img{
      width: 100%;
      height: auto;
      // max-width:100%; 
      // max-height:300px

    }

  }
 
}
.swiper-pagination {
  // 有scoped属性的情况用::v-deep 样式穿透修改第三方样式
    ::v-deep  .swiper-pagination-bullet-active {
    background-color: red !important;
  }
}
</style>
