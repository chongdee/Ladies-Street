<template>
  <div class="recommend">
    <div class="recmd-itme" v-for="item in recommend" :key="item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
      default(){
        return []
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .recommend{
    display: flex;
    padding: 10px 0;
    border-bottom: 10px solid #eee;
    text-align: center;
    font-size: 14px;
    .recmd-itme{
      flex: 1;
      img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
      }
    }
  }

</style>