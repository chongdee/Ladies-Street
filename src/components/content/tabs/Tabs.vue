<template>
  <div class="tabs-box">
    <div class="tabs-item" v-for="(title, index) in titles" :key="title"
      :class="{active: index===currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      currentIndex: 0
    }
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs-box{
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  .tabs-item{
    flex: 1;
    span{
      padding: 6px;
    }
  }
}
.active{
  color: var(--color-high-text);
  span{
    border-bottom: 3px solid var(--color-tint);
  }
}
</style>