<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="onImgLoad" />

    <div class="goods-info-box">
      <p class="title">{{ goodsItem.title }}</p>
      <p class="goods-info">
        <span class="price">{{ goodsItem.price }}</span>
        <span class="collect">{{ goodsItem.cfav }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    // 计算属性，解决 详情推荐，引用首页的goodslist图片不显示
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },

  methods: {
    onImgLoad() {
      this.$bus.$emit("itemimgload");
    },

    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .goods-info-box {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }

    .goods-info {
      .price {
        color: var(--color-high-text);
        margin-right: 20px;
      }

      .collect {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          left: -15px;
          top: -1px;
          width: 14px;
          height: 14px;
          background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
        }
      }
    }
  }
}
</style>
