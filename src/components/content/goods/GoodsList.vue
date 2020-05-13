<template>
  <div class="goods-list-box">
    <goods-list-item
    v-for="item in goods" 
    :key="item"
    :goods-item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default(){
        return []
      }
    },
  },
  data() {
    return {

    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style lang="scss" scoped>
.goods-list-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>
