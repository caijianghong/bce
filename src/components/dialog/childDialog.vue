<template>
<el-dialog :title="title" width="40%" :visible.sync="visible" @close="$emit('update:dataShow', false)" :dataShow="dataShow" :modal-append-to-body="false" :append-to-body="true" v-dialogDrag>
  <div class="show-flex-r dialog-title">
    <span class="show-flex-r show-flex-center"><img src="../../assets/image/index/export.png" title="导出" @click="exportExcel"></span>
  </div>
  <el-table :data="tableData" class="child-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 0" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="村名" width="120"></el-table-column>
    <el-table-column label="土地资源">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.land)">
          {{scope.row.land}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="水资源">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.water)">
          {{scope.row.water}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生态资源">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.sthj)">
          {{scope.row.sthj}}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="result" label="土地综合承载力评价">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.result)">
          {{scope.row.result}}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="tableData" class="child-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 1" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="村名" width="120"></el-table-column>
    <el-table-column label="面积" width="120">
      <template slot-scope="scope">
        <div>
          {{scope.row.area}}km²
        </div>
      </template>
    </el-table-column>
    <el-table-column label="建设开发评价">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.buildRes)">
          {{scope.row.buildRes}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="耕地开发评价">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.cultivatedLandRes)">
          {{scope.row.cultivatedLandRes}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="土地综合承载力评价">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.result)">
          {{scope.row.result}}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="tableData" class="child-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 2" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="村名" width="120"></el-table-column>
    <el-table-column label="面积" width="120">
      <template slot-scope="scope">
        <div>
          {{scope.row.area}}km²
        </div>
      </template>
    </el-table-column>
    <el-table-column label="水资源承载力评价指数">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.waterRes)">
          {{scope.row.waterRes}}
        </div>
      </template>
    </el-table-column>
    <!--<el-table-column label="水资源承载力修正评价">
      <template slot-scope="scope">
        <div>
          {{scope.row.revisionEvaluation}}
        </div>
      </template>
    </el-table-column>-->
    <el-table-column label="水环境状态评价">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.result)">
          {{scope.row.result}}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="tableData" class="child-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 3" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="村名" width="120"></el-table-column>
    <el-table-column label="生物丰度指数">
      <template slot-scope="scope">
        <div>
          {{scope.row.fd}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="植被覆盖指数">
      <template slot-scope="scope">
        <div>
          {{scope.row.fg}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="土地胁迫指数">
      <template slot-scope="scope">
        <div>
          {{scope.row.xp}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="污染负荷指数">
      <template slot-scope="scope">
        <div>
          {{scope.row.fh}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生态环境状况承载力评价">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.result)">
          {{scope.row.result}}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="tableData" class="child-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 'build'" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="村名" width="120"></el-table-column>
    <!--<el-table-column label="开发强度" width="80">
      <template slot-scope="scope">
        <div>
          {{scope.row.developmentIntensity}}
        </div>
      </template>
    </el-table-column>-->
    <el-table-column label="建设用地现状开发程度">
      <template slot-scope="scope">
        <div>
          {{ numMulti(scope.row.developmentLevel,100)}}%
        </div>
      </template>
    </el-table-column>
    <el-table-column label="现状建设用地布局匹配度">
      <template slot-scope="scope">
        <div>
          {{numMulti(scope.row.matchingDegree,100)}}%
        </div>
      </template>
    </el-table-column>
    <el-table-column label="建设用地压力状态指数">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.buildRes)">
          {{scope.row.buildRes}}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="tableData" class="child-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 'cultivatedLand'" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="村名" width="120"></el-table-column>
    <el-table-column label="人均耕地生产能力">
      <template slot-scope="scope">
        <div>
          {{scope.row.landProductivity}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="耕地开发利用程度">
      <template slot-scope="scope">
        <div>
          {{numMulti(scope.row.utilizeLandDegree,100)}}%
        </div>
      </template>
    </el-table-column>
    <el-table-column label="耕地开发压力状态指数">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.cultivatedLandRes)">
          {{scope.row.cultivatedLandRes}}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="tableData" class="child-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 'water'" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column prop="name" label="村名" width="120"></el-table-column>
    <el-table-column label="农业用水与耕地匹配指数">
      <template slot-scope="scope">
        <div>
          {{scope.row.agricultureWater}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生活和工业用水与城镇工矿用地匹配指数" width="250">
      <template slot-scope="scope">
        <div>
          {{scope.row.matchingDegree}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="水资源承载力评价指数">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.waterRes)">
          {{scope.row.waterRes}}
        </div>
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
  name: "childDialog",
  data() {
    return {
      visible: this.dataShow,
      centerObj: {
        'text-align': 'center'
      }
    };
  },
  props: {
    title: [String],
    selectType: [String],
    dataShow: {
      type: Boolean,
      default: false
    },
    tableData: [Array]
  },
  methods: {
    exportExcel() {
      exportEXCEL(this.title, '.child-table');
    },
    numMulti(num1, num2) {
      var baseNum = 0;
      try {
        baseNum += num1.toString().split(".")[1].length;
      } catch (e) {}
      try {
        baseNum += num2.toString().split(".")[1].length;
      } catch (e) {}
      return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    },
    updateColor(status) {
      let obj = {};
      if (status == '超载') {
        obj = {
          color: 'red'
        }
      } else if (status == '临界') {
        obj = {
          color: 'orange'
        }
      }
      return obj;
    },
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
