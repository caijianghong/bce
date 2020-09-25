<template>
<div id="line-cpn">
  <span></span>
  <strong class="flex1"></strong>
  <span></span>
</div>
</template>

<script>
export default {
  name: "lineCpn",
  data() {
    return {}
  }
};
</script>

<style lang="less" scoped>
#line-cpn {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.flex1 {
  flex: 1;
}

#line-cpn span {
  width: 12px;
  height: 4px;
  background-color: #02BBFE;
}

#line-cpn strong {
  height: 2px;
  background-color: #1C2252;
}
</style>
