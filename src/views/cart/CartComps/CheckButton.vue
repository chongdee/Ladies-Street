<template>
    <div>
      <div class="icon-selector" :class="{'checked-active': isChecked}">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      },
    },
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;

  }
  .icon-selector img {
    margin-top: 2px;
  }

  .checked-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
