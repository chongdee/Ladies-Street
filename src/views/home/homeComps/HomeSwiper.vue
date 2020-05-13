<template>
   <div>
     <swiper class="swiper-box" ref="mySwiper" :options="swiperOptions">
      <swiper-slide 
        v-for="item in banner"
        :key="item"
      >
      <a :href="item.link"> <img :src="item.image" alt="" @load="imgload"></a>
     </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
   </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        // Some Swiper option/callback...
        autoplay:{
          delay:2000,
          disableOnInteraction:false
        },
        loop : true
      },

      isLoad: false
    }
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    // console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },

  methods: {
    imgload() {
      // 条件判断图片加载一张就可以，剩下的不用加载
      if (!this.isLoad){
        this.$emit('swiperimgload')
        this.isLoad = true
      }
     
    }
  },


}
</script>

<style lang="scss" scoped>
.swiper-box{
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
.swiper-pagination {
  // 有scoped属性的情况用::v-deep 样式穿透修改第三方样式
    ::v-deep  .swiper-pagination-bullet-active {
    background-color: red !important;
  }
}
</style>