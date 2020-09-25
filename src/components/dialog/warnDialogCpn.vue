<template>
<el-dialog :title="title" width="40%" :visible.sync="visible" @close="$emit('update:dataShow', false)" :dataShow="dataShow" :modal-append-to-body="false" :append-to-body="true" v-dialogDrag>
  <div class="show-flex-r dialog-title">
    <span class="show-flex-r show-flex-center"><img src="../../assets/image/index/export.png" title="导出" @click="exportExcel"></span>
  </div>
  <el-table :data="tableData" border style="width: 100%" id="warn-table" max-height="400" size="mini" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="城镇"></el-table-column>
    <el-table-column prop="first" label="2016年"></el-table-column>
    <el-table-column prop="second" label="2017年"></el-table-column>
    <el-table-column prop="third" label="2018年"></el-table-column>
    <el-table-column prop="forth" label="2019年"></el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.status)">{{scope.row.status}}</div>
      </template>
    </el-table-column>
  </el-table>
</el-dialog>
</template>

<script>
import {
  exportEXCEL
} from "@/assets/js/util.js";
export default {
  name: "warnDialogCpn",
  data() {
    return {
      visible: this.dataShow
    };
  },
  props: {
    title: [String],
    dataShow: {
      type: Boolean,
      default: false
    },
    tableData: [Array]
  },
  methods: {
    updateColor(status) {
      let obj = {};
      if (status == '轻警') {
        obj = {
          color: '#5EBE67'
        }
      } else if (status == '重警') {
        obj = {
          color: '#FF0000'
        }
      }
      return obj;
    },
    exportExcel() {
      exportEXCEL(this.title, '#warn-table');
    }
  },
  watch: {
    dataShow() {
      this.visible = this.dataShow;
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-title {
  justify-content: flex-end;
  margin-bottom: 10px;

  &>span {
    width: 26px;
    height: 26px;
    border: 1px solid #999;
    cursor: pointer;

    &>img {
      display: block;
      flex: 1;
      width: 100%;
    }
  }
}
</style>
