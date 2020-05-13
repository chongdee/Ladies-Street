<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message='默认文字', duration=2000) {
      
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  },
}
</script>

<style lang="scss" scoped>
.toast{
  width: 250px;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  color: #fff;
  background-color: rgba(0,0,0,.8);
  font-size: 18px;
  text-align: center;
}
</style>
