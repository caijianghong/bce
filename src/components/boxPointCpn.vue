<template>
<div id="box-point-cpn">
  <div class="box1">
    <div class="child-box1"></div>
  </div>
  <div class="box2">
    <div class="child-box2"></div>
  </div>
  <div class="box3">
    <div class="child-box3"></div>
  </div>
  <div class="box4">
    <div class="child-box4"></div>
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
.box1 {
  width: 8px;
  height: 8px;
  border-top: 4px solid #fff;
  border-left: 4px solid #fff;
  position: absolute;
  top: -4px;
  left: -4px;

  .child-box1 {
    width: 4px;
    height: 4px;
    background-color: #fff;
    position: absolute;
    top: 14px;
    left: -4px;
  }
}

.box2 {
  width: 8px;
  height: 8px;
  border-top: 4px solid #fff;
  border-right: 4px solid #fff;
  position: absolute;
  top: -4px;
  right: -4px;

  .child-box2 {
    width: 4px;
    height: 4px;
    background-color: #fff;
    position: absolute;
    top: 14px;
    right: -4px;
  }
}

.box3 {
  width: 8px;
  height: 8px;
  border-bottom: 4px solid #fff;
  border-left: 4px solid #fff;
  position: absolute;
  bottom: -4px;
  left: -4px;

  .child-box3 {
    width: 4px;
    height: 4px;
    background-color: #fff;
    position: absolute;
    bottom: 14px;
    left: -4px;
  }
}

.box4 {
  width: 8px;
  height: 8px;
  border-bottom: 4px solid #fff;
  border-right: 4px solid #fff;
  position: absolute;
  bottom: -4px;
  right: -4px;

  .child-box4 {
    width: 4px;
    height: 4px;
    background-color: #fff;
    position: absolute;
    bottom: 14px;
    right: -4px;
  }
}
</style>
