<template>
<el-dialog :title="title" width="40%" :visible.sync="visible" @close="$emit('update:dataShow', false)" :dataShow="dataShow" :modal-append-to-body="false" :append-to-body="true" v-dialogDrag>
  <div class="show-flex-r dialog-title">
    <span class="show-flex-r show-flex-center"><img src="../../assets/image/index/export.png" title="导出" @click="exportExcel"></span>
  </div>
  <el-table :data="tableData" class="out-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 0" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column label="城镇" width="120">
      <template slot-scope="scope">
        <el-button type="text" @click="openDia(scope.row)" class="font-size12">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
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
    <el-table-column label="土地综合承载力评价">
      <template slot-scope="scope">
        <div :style="updateColor(scope.row.result)">
          {{scope.row.result}}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="tableData" class="out-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 1" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column label="城镇" width="120">
      <template slot-scope="scope">
        <el-button type="text" @click="openDia(scope.row)" class="font-size12">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="面积" width="120">
      <template slot-scope="scope">
        <div>
          {{scope.row.area}}km²
        </div>
      </template>
    </el-table-column>
    <el-table-column label="建设开发评价">
      <template slot-scope="scope">
        <el-button type="text" @click="openBulidDia(scope.row)" class="font-size12">{{scope.row.buildRes}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="耕地开发评价">
      <template slot-scope="scope">
        <el-button type="text" @click="openCultivatedLandDia(scope.row)" class="font-size12">{{scope.row.cultivatedLandRes}}</el-button>
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
  <el-table :data="tableData" class="out-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 2" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column label="城镇" width="120">
      <template slot-scope="scope">
        <el-button type="text" @click="openDia(scope.row)" class="font-size12">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="水资源面积" width="120">
      <template slot-scope="scope">
        <div>
          {{scope.row.area}}km²
        </div>
      </template>
    </el-table-column>
    <el-table-column label="水资源承载力评价指数">
      <template slot-scope="scope">
        <el-button type="text" @click="openWaterDia(scope.row)" class="font-size12">{{scope.row.waterRes}}</el-button>
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
  <el-table :data="tableData" class="out-table" border style="width: 100%" max-height="400" size="mini" v-if="selectType == 3" :header-cell-style="centerObj" :cell-style="centerObj">
    <el-table-column type="index" width="50" label="序号"></el-table-column>
    <el-table-column label="城镇" width="120">
      <template slot-scope="scope">
        <el-button type="text" @click="openDia(scope.row)" class="font-size12">{{scope.row.name}}</el-button>
      </template>
    </el-table-column>
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
  <childDialog :dataShow.sync="isShow" :title="diaTitle" :tableData="childData" :selectType="typepop"></childDialog>
</el-dialog>
</template>

<script>
import {
  exportEXCEL
} from "@/assets/js/util.js";
import childDialog from "./childDialog"
export default {
  name: "dialogCpn",
  data() {
    return {
      visible: this.dataShow,
      isShow: false,
      diaTitle: '',
      childData: [],
      typepop: '',
      centerObj: {
        'text-align': 'center'
      }
    };
  },
  components: {
    childDialog
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
    openDia(row) {
      if (this.selectType == 0 || this.selectType == 1) {
        this.diaTitle = row.name + '土地综合承载力评价';
      } else if (this.selectType == 2) {
        this.diaTitle = row.name + '水资源单指标承载状态';
      } else if (this.selectType == 3) {
        this.diaTitle = row.name + '生态环境资源单指标承载状态';
      }
      this.childData = row.child;
      this.typepop = this.selectType;
      this.isShow = true;
    },
    commonMethod(row, titleName, type) {
      this.diaTitle = row.name + titleName;
      this.childData = row.child;
      this.typepop = type;
      this.isShow = true;
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
    openBulidDia(row) {
      this.commonMethod(row, '建设开发评价', 'build');
    },
    openCultivatedLandDia(row) {
      this.commonMethod(row, '耕地开发评价', 'cultivatedLand');
    },
    openWaterDia(row) {
      this.commonMethod(row, '水资源承载力评价指数', 'water');
    },
    exportExcel() {
      exportEXCEL(this.title, '.out-table');
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
