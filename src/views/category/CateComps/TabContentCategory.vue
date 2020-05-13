<template>
  <div class="container">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <!-- :href="item.link" -->
      <a :href="item.link" class="item-inner">
        <img class="item-img" :src="item.image" alt="" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
// import GridView from "components/common/gridView/GridView";

export default {
  name: "TabContentCategory",
  components: {
    // GridView
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding-top: 14px;
  
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin-bottom: 8px;
    .item-inner {
      text-align: center;
      .item-img {
        width: 90px;
        height: 90px;
      }
      .item-text {
        font-size: 12px;
       
      }
    }
  }
}
</style>
