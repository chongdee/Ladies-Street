import BackTop from "components/content/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },

  methods: {
    backTopClick() {
      // console.log('回到顶部');
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
