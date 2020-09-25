<template>
<div id="box-cpn">
  <div class="box1"></div>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
</div>
</template>

<script>
export default {
  name: "boxCpn",
  data() {
    return {}
  }
};
</script>

<style lang="less" scoped>
#box-cpn {
  border: 2px solid #23314C;

  .box1 {
    width: 15px;
    height: 15px;
    border-top: 2px solid #10F9FF;
    border-left: 2px solid #10F9FF;
    position: absolute;
    top: -2px;
    left: -2px;
  }

  .box2 {
    width: 15px;
    height: 15px;
    border-top: 2px solid #10F9FF;
    border-right: 2px solid #10F9FF;
    position: absolute;
    top: -2px;
    right: -2px;
  }

  .box3 {
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #10F9FF;
    border-left: 2px solid #10F9FF;
    position: absolute;
    bottom: -2px;
    left: -2px;
  }

  .box4 {
    width: 15px;
    height: 15px;
    border-bottom: 2px solid #10F9FF;
    border-right: 2px solid #10F9FF;
    position: absolute;
    bottom: -2px;
    right: -2px;
  }
}
</style>
