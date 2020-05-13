<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back-icon" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles-box">
        <div 
            v-for="(item, index) in titles" 
            :key="item"
            class="title-item"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";



export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },

  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleclick', index)
    },

    backClick() {
      this.$router.back()
    },

    
  },
};
</script>

<style lang="scss" scoped>
.nav-bar{
  border-bottom: 1px solid #eee;
  .back-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
  }
}
.titles-box {
  display: flex;
  font-size: 14px;
  .title-item{
    flex: 1;
  }
}

.active {
  color: var(--color-high-text)
}

</style>
