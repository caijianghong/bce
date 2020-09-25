<template>
<div id="box-nopoint-cpn">
  <div class="box1">
  </div>
  <div class="box2">
  </div>
  <div class="box3">
  </div>
  <div class="box4">
  </div>
</div>
</template>

<script>
export default {
  name: "box-point-cpn",
  data() {
    return {}
  }
};
</script>

<style lang="less" scoped>
#box-nopoint-cpn {
  .box1 {
    width: 8px;
    height: 8px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    position: absolute;
    top: -1px;
    left: -1px;
  }

  .box2 {
    width: 8px;
    height: 8px;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
    position: absolute;
    top: -1px;
    right: -1px;

  }

  .box3 {
    width: 8px;
    height: 8px;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
    position: absolute;
    bottom: -1px;
    left: -1px;

  }

  .box4 {
    width: 8px;
    height: 8px;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    position: absolute;
    bottom: -1px;
    right: -1px;

  }
}
</style>
