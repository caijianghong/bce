<template>
<div id="body">
  <!-- 头部 -->
  <div class="my-top show-flex-r">
    <div class="flex1">
      <div class="nav show-flex-r">
        <div v-for="(item,index) in navList" :key="index" class="show-flex-c show-flex-center nav-item" @click="changeIndex(index)">
          <boxNoPointCpn style="width: calc(100% - 2px);height: calc(100% - 2px);position: absolute;"></boxNoPointCpn>
          <img :src="selectedIndex == index ? item.selectUrl : item.url" :width="(index == 0 || index == 2) ? 28 : 30" :height="(index == 0 || index == 2) ? 34 : 30">
          <span :class="{'select-col': selectedIndex == index ? true: false}" style="margin-top: 5px">{{item.title}}</span>
        </div>
      </div>
    </div>
    <div class="flex1">
      <div class="text-center">
        <img src="../../assets/image/index/logo.png">
      </div>
      <div class="text-center curr-date">
        {{curTime | formatDate('yyyy年MM月dd日 hh:mm:ss')}}
      </div>
      <div class="text-center" style="margin-left: -38px;margin-top: -12px;">
        <img src="../../assets/image/index/bottom_line.png">
      </div>
    </div>

    <div class="flex1">
      <div class="daping show-flex-r show-flex-center">
        <el-button type="text">上传数据</el-button>
        <el-button type="text" @click="backHome">大屏展示</el-button>
      </div>
    </div>
  </div>
  <div id="weather-v2-plugin-standard"></div>
  <!-- 底图切换 -->
  <div class="map-style-button show-flex-r">
    <div id="satellite" :class="{'map-style-buttonlist': true, 'map-style-buttonActive': selectTC == 'satellite' ? true : false}" @click="changeType('satellite')">
      卫星影像
    </div>
    <div id="2d" :class="{'map-style-buttonlist': true, 'map-style-buttonActive': selectTC == '2d' ? true : false}" @click="changeType('2d')">
      二维影像
    </div>
  </div>
  <div class="season-box">
    <el-select v-model="seasonVal" placeholder="2019年" size="small" clearable @change="seasonChange">
      <el-option v-for="item in seasonOps" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
  <!--测量工具-->
  <div class="utilsBar show-flex-c">
    <input id="mArea" type="image" :src="imgUrl[0]" title="总览" @click="drawImg('all')" class="marginB5" />
    <input id="mLine" type="image" :src="imgUrl[1]" title="预警" @click="drawImg('warn')" class="marginB5" />
    <input id="mLine" type="image" :src="imgUrl[2]" title="测距" @click="drawImg('line')" class="marginB5" />
    <input id="mArea" type="image" :src="imgUrl[3]" title="测面" @click="drawImg('area')" class="marginB5" />
    <input id="mClear" type="image" :src="imgUrl[4]" title="清除" @click="drawImg('none')" />
  </div>
  <div class="content">
    <div id="mapName"></div>
  </div>
  <div class="lenged-box font-size14 show-flex-c">
    <div class="show-flex-r align-center">
      <i></i>
      <span>超载</span>
    </div>
    <div class="show-flex-r align-center">
      <i></i>
      <span>临界</span>
    </div>
    <div class="show-flex-r align-center">
      <i></i>
      <span>可载</span>
    </div>
  </div>
  <div class="left-box">
    <div class="top">
      <boxPointCpn style="width: calc(100% - 20px);height: calc(100% - 20px);position: absolute;"></boxPointCpn>
      <div class="title show-flex-r show-flex-center font-size16">
        <span v-if="selectedIndex == 0">德清县土地综合承载力评价总览</span>
        <span v-if="selectedIndex == 1">德清县土地资源承载力状态</span>
        <span v-if="selectedIndex == 2">德清县水资源承载力状态</span>
        <span v-if="selectedIndex == 3">德清县生态环境资源承载力状态</span>
      </div>
      <dl class="show-flex-r font-size14" style="height: 100%">
        <dt v-if="needData && needData.topObj" style="width: 40%" class="pie-left-con show-flex-c">
          <div v-if="needData.topObj.tdArea">土地面积：{{needData.topObj.tdArea}}km²</div>
          <div v-if="needData.topObj.waterArea">水资源面积：{{needData.topObj.waterArea}}km²</div>
          <div>超载城镇：{{needData.topObj.townList[0].number}}个</div>
          <div>临界城镇：{{needData.topObj.townList[1].number}}个</div>
          <div>可载城镇：{{needData.topObj.townList[2].number}}个</div>
        </dt>
        <dd class="pie" style="width: 60%;height: 100%"></dd>
      </dl>
    </div>
    <div class="center">
      <boxPointCpn style="width: calc(100% - 20px);height: calc(100% - 20px);position: absolute;"></boxPointCpn>
      <div class="bar-center show-bar" style="width: 100%;height: 100%" v-if="selectedIndex != 3">
      </div>
      <div v-if="selectedIndex == 3" style="width: 100%;height: 100%;overflow: hidden;" class="show-bar2">
        <el-carousel indicator-position="none">
          <el-carousel-item style="height: 100%">
            <div class="bar-fd" style="width: 100%;height:100%"></div>
          </el-carousel-item>
          <el-carousel-item style="height: 100%">
            <div class="bar-fg" style="width: 100%;height:100%"></div>
          </el-carousel-item>
          <el-carousel-item style="height: 100%">
            <div class="bar-xp" style="width: 100%;height:100% "></div>
          </el-carousel-item>
          <el-carousel-item style="height: 100%">
            <div class="bar-fh" style="width: 100%;height:100%"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="bottom">
      <boxPointCpn style="width: calc(100% - 20px);height: calc(100% - 40px);position: absolute;" v-if="selectedIndex != 3"></boxPointCpn>
      <dl v-if="selectedIndex == 0" style="height: calc(100% - 20px);position: relative;z-index: 2;">
        <dt class="show-flex-r show-flex-center" style="height: 60px">
          <span>德清县{{tabTitle}}资源承载力评价详情</span>
        </dt>
        <dd class="show-flex-r align-center font-size14" style="height: calc(100% - 80px)">
          <div class="show-flex-c" style="width: 90px;margin: 0 10px;height: 100%;background: rgba(231,231,226,0.8);color: #000">
            <div :class="['show-flex-r','show-flex-center','flex1', 'cursor-style',(index != tabList.length -1) ? 'b-bottom' : '', tabAselect == index ? 'select-bg' : '']" v-for="(item,index) in tabList" :key="index" @click="tabAchange(index)"><span>{{item}}</span></div>
          </div>
          <div style="width: 250px;height: calc(100% - 2px);border: 1px solid #ccc" class="show-flex-c">
            <div v-for="(item,index) in tabDetail" :key="index" :class="['flex1','show-flex-r', 'align-center',(index != tabDetail.length - 1) ? 'b-bottom' : '']">
              <span style="padding-left: 10px">{{item.type}}：</span><span>{{item.number}}个</span>
            </div>
          </div>
        </dd>
      </dl>
      <div v-if="selectedIndex == 1 || selectedIndex == 2" style="height: 100%">
        <div class="bar-bottom" style="width: 100%;height: 100%"></div>
      </div>
      <div v-if="selectedIndex == 3" style="height: 100%;"></div>
    </div>
  </div>
  <dialogCpn :dataShow.sync="dataShow" :title="diaTitle" :tableData="listData" :selectType="selectedIndex.toString()"></dialogCpn>
  <warnDialogCpn :dataShow.sync="warnDataShow" :title="warnDiaTitle" :tableData="warnData"></warnDialogCpn>
  <childDialog :dataShow.sync="mapDiaShow" :title="mapDiaTitle" :tableData="mapChildData" :selectType="mapTypepop"></childDialog>
</div>
</template>

<script>
import axios from 'axios'
import XLSX from 'xlsx'
import dialogCpn from "@/components/dialog/dialogCpn"
import childDialog from "@/components/dialog/childDialog"
import warnDialogCpn from "@/components/dialog/warnDialogCpn"
import boxPointCpn from "@/components/boxPointCpn"
import boxNoPointCpn from "@/components/boxNoPointCpn"
import {
  showLoading,
  hideLoading
} from "@/assets/js/loading";
import {
  setBarOption,
  setHomeBarOption,
  setPieOption,
  completeTown,
  checkLand,
  checkWater,
  checkSthj,
  checkAll,
  sum,
  mathNum,
  filterSum,
  getFixedArr,
  getThirdArr,
  filterCunArr,
  removeKeyEmputyStr,
  getTownList,
  yujingList
} from '@/assets/js/util.js'
import {
  formatDate
} from '@/assets/js/filter.js'
var resultObj, showArr, allzy, tudizy, waterzy, sthjzy;
import {
  loadModules,
  setDefaultOptions
} from 'esri-loader';
var geoserviceUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer";
var map, layera, layerb, bgLayer, borderLayer, measureFlag, landArea, waterArea, zhenPoints, graphicsLayer;
var base = process.env.NODE_ENV === "production" ? "/bce" : '';

function getBase() {
  return axios.get(base + "/excels/total.xls", {
    responseType: 'arraybuffer'
  })
}

function getData2016() {
  return axios.get(base + "/excels/2016.xlsx", {
    responseType: 'arraybuffer'
  })
}

function getData2017() {
  return axios.get(base + "/excels/2017.xlsx", {
    responseType: 'arraybuffer'
  })
}

function getData2018() {
  return axios.get(base + "/excels/2018.xlsx", {
    responseType: 'arraybuffer'
  })
}

function getData2019() {
  return axios.get(base + "/excels/2019.xlsx", {
    responseType: 'arraybuffer'
  })
}
export default {
  data() {
    return {
      curTime: false,
      navList: [{
          url: require('@/assets/image/nav/home.png'),
          selectUrl: require('@/assets/image/nav/home-active.png'),
          title: '首页'
        }, {
          url: require('@/assets/image/nav/resources.png'),
          selectUrl: require('@/assets/image/nav/resources-active.png'),
          title: '土地资源'
        },
        {
          url: require('@/assets/image/nav/water.png'),
          selectUrl: require('@/assets/image/nav/water-active.png'),
          title: '水资源'
        },
        {
          url: require('@/assets/image/nav/environment.png'),
          selectUrl: require('@/assets/image/nav/environment-active.png'),
          title: '生态环境'
        }
      ],
      imgUrl: [
        require("@/assets/image/index/list-square.png"),
        require("@/assets/image/index/jb.png"),
        require("@/assets/image/index/dot-line.png"),
        require("@/assets/image/index/dot-sqaure-line.png"),
        require("@/assets/image/index/recycle-left.png")
      ],
      selectedIndex: 0,
      bgLayerUrl: "http://183.129.170.180:6080/arcgis/rest/services/luoshe/deqing_DOM_an/MapServer", //影像图层
      borderUrl: 'http://183.129.170.180:6080/arcgis/rest/services/luoshe/deqing_zhenjie/MapServer',
      point: null,
      tileInfo: null,
      td2_satellite: "http://{subDomain}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles&tk=341fb96634c911d332f700e50e4670d1",
      td1_satellite: "http://{subDomain}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles&tk=341fb96634c911d332f700e50e4670d1",
      td1_2d: "http://{subDomain}.tianditu.gov.cn/DataServer?T=vec_c&x={col}&y={row}&l={level}&tk=341fb96634c911d332f700e50e4670d1",
      td2_2d: "http://{subDomain}.tianditu.gov.cn/DataServer?T=cva_c&x={col}&y={row}&l={level}&tk=341fb96634c911d332f700e50e4670d1",
      selectTC: 'satellite',
      seasonVal: '',
      seasonOps: [{
        value: '1',
        label: '2016年'
      }, {
        value: '2',
        label: '2017年'
      }, {
        value: '3',
        label: '2018年'
      }, {
        value: '4',
        label: '2019年'
      }],
      needData: {},
      tabAselect: 0,
      tabList: ['土地资源', '水资源', '生态环境'],
      tabDetail: [],
      dataShow: false,
      warnDataShow: false,
      diaTitle: '',
      warnDiaTitle: '',
      warnData: [],
      listData: [],
      mapDiaShow: false,
      mapDiaTitle: '',
      mapChildData: [],
      mapTypepop: '',
      tabTitle: '土地'
    }
  },
  components: {
    dialogCpn,
    warnDialogCpn,
    childDialog,
    boxPointCpn,
    boxNoPointCpn
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (localStorage.getItem('INDEXINFO') == null) {
        this.getExcel();
      } else {
        let INDEXINFO = JSON.parse(localStorage.getItem('INDEXINFO'));
        setDefaultOptions({
          url: `http://114.55.165.49/arcgis/3.17/init.js`
        });
        allzy = INDEXINFO.allzy;
        resultObj = INDEXINFO.resultObj;
        tudizy = INDEXINFO.tudizy;
        waterzy = INDEXINFO.waterzy;
        sthjzy = INDEXINFO.sthjzy;
        this.configCurrentTimmer();
        this.initWea();
        this.initMap();
        this.needData = allzy.quarter4th;
        this.tabDetail = this.needData.bottomObj.tdzy;
        this.initData();
      }
    },
    getExcel() {
      showLoading("拼命加载中...");
      let self = this;
      axios.all([getData2016(), getData2017(), getData2018(), getData2019(), getBase()])
        .then(axios.spread(function (res1, res2, res3, res4, res5) {
          // 获取到所有表数据之后执行
          hideLoading();
          let wb1 = XLSX.read(new Uint8Array(res1.data), {
            type: "array"
          })
          let wb2 = XLSX.read(new Uint8Array(res2.data), {
            type: "array"
          })
          let wb3 = XLSX.read(new Uint8Array(res3.data), {
            type: "array"
          })
          let wb4 = XLSX.read(new Uint8Array(res4.data), {
            type: "array"
          })
          let wb5 = XLSX.read(new Uint8Array(res5.data), {
            type: "array"
          })
          let landZhen1 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb1.Sheets[wb1.SheetNames[0]]));
          let landCun1 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb1.Sheets[wb1.SheetNames[1]]));
          let waterZhen1 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb1.Sheets[wb1.SheetNames[2]]));
          let waterCun1 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb1.Sheets[wb1.SheetNames[3]]));
          let ambientZhen1 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb1.Sheets[wb1.SheetNames[4]]));
          let ambientCun1 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb1.Sheets[wb1.SheetNames[5]]));
          let landZhen2 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[0]]));
          let landCun2 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[1]]));
          let waterZhen2 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[2]]));
          let waterCun2 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[3]]));
          let ambientZhen2 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[4]]));
          let ambientCun2 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[5]]));
          let landZhen3 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb3.Sheets[wb3.SheetNames[0]]));
          let landCun3 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb3.Sheets[wb3.SheetNames[1]]));
          let waterZhen3 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb3.Sheets[wb3.SheetNames[2]]));
          let waterCun3 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb3.Sheets[wb3.SheetNames[3]]));
          let ambientZhen3 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb3.Sheets[wb3.SheetNames[4]]));
          let ambientCun3 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb3.Sheets[wb3.SheetNames[5]]));
          let landZhen4 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb4.Sheets[wb4.SheetNames[0]]));
          let landCun4 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb4.Sheets[wb4.SheetNames[1]]));
          let waterZhen4 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb4.Sheets[wb4.SheetNames[2]]));
          let waterCun4 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb4.Sheets[wb4.SheetNames[3]]));
          let ambientZhen4 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb4.Sheets[wb4.SheetNames[4]]));
          let ambientCun4 = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb4.Sheets[wb4.SheetNames[5]]));
          let baseData = removeKeyEmputyStr(XLSX.utils.sheet_to_json(wb5.Sheets[wb5.SheetNames[0]]));
          completeTown(baseData, '镇名');
          completeTown(landCun1, '镇名');
          completeTown(landCun2, '镇名');
          completeTown(landCun3, '镇名');
          completeTown(landCun4, '镇名');
          completeTown(waterCun1, '镇名');
          completeTown(waterCun2, '镇名');
          completeTown(waterCun3, '镇名');
          completeTown(waterCun4, '镇名');
          completeTown(ambientCun1, '镇名');
          completeTown(ambientCun2, '镇名');
          completeTown(ambientCun3, '镇名');
          completeTown(ambientCun4, '镇名');
          tudizy = {
            quarter1th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）')
              },
              centerArr: getFixedArr(landZhen1, '镇名', '现状建设用地布局匹配度'),
              bottomObj: getFixedArr(landZhen1, '镇名', '耕地开发利用程度'),
              zonghe: self.getZonghe(landZhen1, baseData, landCun1, 'land')
            },
            quarter2th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）')
              },
              centerArr: getFixedArr(landZhen2, '镇名', '现状建设用地布局匹配度'),
              bottomObj: getFixedArr(landZhen2, '镇名', '耕地开发利用程度'),
              zonghe: self.getZonghe(landZhen2, baseData, landCun2, 'land')
            },
            quarter3th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）')
              },
              centerArr: getFixedArr(landZhen3, '镇名', '现状建设用地布局匹配度'),
              bottomObj: getFixedArr(landZhen3, '镇名', '耕地开发利用程度'),
              zonghe: self.getZonghe(landZhen3, baseData, landCun3, 'land')
            },
            quarter4th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）')
              },
              centerArr: getFixedArr(landZhen4, '镇名', '现状建设用地布局匹配度'),
              bottomObj: getFixedArr(landZhen4, '镇名', '耕地开发利用程度'),
              zonghe: self.getZonghe(landZhen4, baseData, landCun4, 'land')
            },
          }
          tudizy.quarter1th.topObj.townList = getTownList(tudizy.quarter1th.zonghe, 'result');
          tudizy.quarter2th.topObj.townList = getTownList(tudizy.quarter2th.zonghe, 'result');
          tudizy.quarter3th.topObj.townList = getTownList(tudizy.quarter3th.zonghe, 'result');
          tudizy.quarter4th.topObj.townList = getTownList(tudizy.quarter4th.zonghe, 'result');
          tudizy.warning = yujingList(tudizy);
          waterzy = {
            quarter1th: {
              topObj: {
                waterArea: sum(baseData, '水资源面积（平方千米）')
              },
              centerArr: getFixedArr(waterZhen1, '镇名', '水资源承载指数'),
              bottomObj: getFixedArr(waterZhen1, '镇名', '水土资源匹配指数'),
              zonghe: self.getZonghe(waterZhen1, baseData, waterCun1, 'water')
            },
            quarter2th: {
              topObj: {
                waterArea: sum(baseData, '水资源面积（平方千米）')
              },
              centerArr: getFixedArr(waterZhen2, '镇名', '水资源承载指数'),
              bottomObj: getFixedArr(waterZhen2, '镇名', '水土资源匹配指数'),
              zonghe: self.getZonghe(waterZhen2, baseData, waterCun2, 'water')
            },
            quarter3th: {
              topObj: {
                waterArea: sum(baseData, '水资源面积（平方千米）')
              },
              centerArr: getFixedArr(waterZhen3, '镇名', '水资源承载指数'),
              bottomObj: getFixedArr(waterZhen3, '镇名', '水土资源匹配指数'),
              zonghe: self.getZonghe(waterZhen3, baseData, waterCun3, 'water')
            },
            quarter4th: {
              topObj: {
                waterArea: sum(baseData, '水资源面积（平方千米）')
              },
              centerArr: getFixedArr(waterZhen4, '镇名', '水资源承载指数'),
              bottomObj: getFixedArr(waterZhen4, '镇名', '水土资源匹配指数'),
              zonghe: self.getZonghe(waterZhen4, baseData, waterCun4, 'water')
            },
          }
          waterzy.quarter1th.topObj.townList = getTownList(waterzy.quarter1th.zonghe, 'result');
          waterzy.quarter2th.topObj.townList = getTownList(waterzy.quarter2th.zonghe, 'result');
          waterzy.quarter3th.topObj.townList = getTownList(waterzy.quarter3th.zonghe, 'result');
          waterzy.quarter4th.topObj.townList = getTownList(waterzy.quarter4th.zonghe, 'result');
          waterzy.warning = yujingList(waterzy);
          sthjzy = {
            quarter1th: {
              topObj: {},
              centerArr: {
                fd: getFixedArr(ambientZhen1, '镇名', '生境质量指数'),
                fg: getFixedArr(ambientZhen1, '镇名', '植被覆盖指数'),
                xp: getFixedArr(ambientZhen1, '镇名', '土地胁迫指数'),
                fh: getFixedArr(ambientZhen1, '镇名', '污染负荷指数')
              },
              zonghe: self.getZonghe(ambientZhen1, baseData, ambientCun1, 'ambient')
            },
            quarter2th: {
              topObj: {},
              centerArr: {
                fd: getFixedArr(ambientZhen2, '镇名', '生境质量指数'),
                fg: getFixedArr(ambientZhen2, '镇名', '植被覆盖指数'),
                xp: getFixedArr(ambientZhen2, '镇名', '土地胁迫指数'),
                fh: getFixedArr(ambientZhen2, '镇名', '污染负荷指数')
              },
              zonghe: self.getZonghe(ambientZhen2, baseData, ambientCun2, 'ambient')
            },
            quarter3th: {
              topObj: {},
              centerArr: {
                fd: getFixedArr(ambientZhen3, '镇名', '生境质量指数'),
                fg: getFixedArr(ambientZhen3, '镇名', '植被覆盖指数'),
                xp: getFixedArr(ambientZhen3, '镇名', '土地胁迫指数'),
                fh: getFixedArr(ambientZhen3, '镇名', '污染负荷指数')
              },
              zonghe: self.getZonghe(ambientZhen3, baseData, ambientCun3, 'ambient')
            },
            quarter4th: {
              topObj: {},
              centerArr: {
                fd: getFixedArr(ambientZhen4, '镇名', '生境质量指数'),
                fg: getFixedArr(ambientZhen4, '镇名', '植被覆盖指数'),
                xp: getFixedArr(ambientZhen4, '镇名', '土地胁迫指数'),
                fh: getFixedArr(ambientZhen4, '镇名', '污染负荷指数')
              },
              zonghe: self.getZonghe(ambientZhen4, baseData, ambientCun4, 'ambient')
            },
          }
          sthjzy.quarter1th.topObj.townList = getTownList(sthjzy.quarter1th.zonghe, 'result');
          sthjzy.quarter2th.topObj.townList = getTownList(sthjzy.quarter2th.zonghe, 'result');
          sthjzy.quarter3th.topObj.townList = getTownList(sthjzy.quarter3th.zonghe, 'result');
          sthjzy.quarter4th.topObj.townList = getTownList(sthjzy.quarter4th.zonghe, 'result');
          sthjzy.warning = yujingList(sthjzy);
          allzy = {
            quarter1th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）'),
                waterArea: sum(baseData, '水资源面积（平方千米）'),
                townList: []
              },
              centerArr: [],
              bottomObj: {},
              zonghe: self.getAllZonghe(tudizy.quarter1th.zonghe, waterzy.quarter1th.zonghe, sthjzy.quarter1th.zonghe)
            },
            quarter2th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）'),
                waterArea: sum(baseData, '水资源面积（平方千米）'),
                townList: []
              },
              centerArr: [],
              bottomObj: {},
              zonghe: self.getAllZonghe(tudizy.quarter2th.zonghe, waterzy.quarter2th.zonghe, sthjzy.quarter2th.zonghe)
            },
            quarter3th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）'),
                waterArea: sum(baseData, '水资源面积（平方千米）'),
                townList: []
              },
              centerArr: [],
              bottomObj: {},
              zonghe: self.getAllZonghe(tudizy.quarter3th.zonghe, waterzy.quarter3th.zonghe, sthjzy.quarter3th.zonghe)
            },
            quarter4th: {
              topObj: {
                tdArea: sum(baseData, '土地面积（平方千米）'),
                waterArea: sum(baseData, '水资源面积（平方千米）'),
                townList: []
              },
              centerArr: [],
              bottomObj: {},
              zonghe: self.getAllZonghe(tudizy.quarter4th.zonghe, waterzy.quarter4th.zonghe, sthjzy.quarter4th.zonghe)
            },
          }
          allzy.quarter1th.topObj.townList = getTownList(allzy.quarter1th.zonghe, 'result');
          allzy.quarter2th.topObj.townList = getTownList(allzy.quarter2th.zonghe, 'result');
          allzy.quarter3th.topObj.townList = getTownList(allzy.quarter3th.zonghe, 'result');
          allzy.quarter4th.topObj.townList = getTownList(allzy.quarter4th.zonghe, 'result');
          allzy.warning = yujingList(allzy);
          allzy.quarter1th.bottomObj = {
            tdzy: getTownList(allzy.quarter1th.zonghe, 'land'),
            szy: getTownList(allzy.quarter1th.zonghe, 'water'),
            stzy: getTownList(allzy.quarter1th.zonghe, 'sthj')
          }
          allzy.quarter2th.bottomObj = {
            tdzy: getTownList(allzy.quarter2th.zonghe, 'land'),
            szy: getTownList(allzy.quarter2th.zonghe, 'water'),
            stzy: getTownList(allzy.quarter2th.zonghe, 'sthj')
          }
          allzy.quarter3th.bottomObj = {
            tdzy: getTownList(allzy.quarter3th.zonghe, 'land'),
            szy: getTownList(allzy.quarter3th.zonghe, 'water'),
            stzy: getTownList(allzy.quarter3th.zonghe, 'sthj')
          }
          allzy.quarter4th.bottomObj = {
            tdzy: getTownList(allzy.quarter4th.zonghe, 'land'),
            szy: getTownList(allzy.quarter4th.zonghe, 'water'),
            stzy: getTownList(allzy.quarter4th.zonghe, 'sthj')
          }
          allzy.quarter1th.centerArr = self.getAllCenter(allzy.warning, 'first')
          allzy.quarter2th.centerArr = self.getAllCenter(allzy.warning, 'second')
          allzy.quarter3th.centerArr = self.getAllCenter(allzy.warning, 'third')
          allzy.quarter4th.centerArr = self.getAllCenter(allzy.warning, 'forth')
          resultObj = {
            all: {
              first: {
                land: getFixedArr(allzy.quarter1th.zonghe, 'name', 'land', true),
                water: getFixedArr(allzy.quarter1th.zonghe, 'name', 'water', true),
                sthj: getFixedArr(allzy.quarter1th.zonghe, 'name', 'sthj', true)
              },
              second: {
                land: getFixedArr(allzy.quarter2th.zonghe, 'name', 'land', true),
                water: getFixedArr(allzy.quarter2th.zonghe, 'name', 'water', true),
                sthj: getFixedArr(allzy.quarter2th.zonghe, 'name', 'sthj', true)
              },
              third: {
                land: getFixedArr(allzy.quarter3th.zonghe, 'name', 'land', true),
                water: getFixedArr(allzy.quarter3th.zonghe, 'name', 'water', true),
                sthj: getFixedArr(allzy.quarter3th.zonghe, 'name', 'sthj', true)
              },
              forth: {
                land: getFixedArr(allzy.quarter4th.zonghe, 'name', 'land', true),
                water: getFixedArr(allzy.quarter4th.zonghe, 'name', 'water', true),
                sthj: getFixedArr(allzy.quarter4th.zonghe, 'name', 'sthj', true)
              }
            },
            land: {
              first: getFixedArr(tudizy.quarter1th.zonghe, 'name', 'result', true),
              second: getFixedArr(tudizy.quarter2th.zonghe, 'name', 'result', true),
              third: getFixedArr(tudizy.quarter3th.zonghe, 'name', 'result', true),
              forth: getFixedArr(tudizy.quarter4th.zonghe, 'name', 'result', true)
            },
            water: {
              first: getFixedArr(waterzy.quarter1th.zonghe, 'name', 'result', true),
              second: getFixedArr(waterzy.quarter2th.zonghe, 'name', 'result', true),
              third: getFixedArr(waterzy.quarter3th.zonghe, 'name', 'result', true),
              forth: getFixedArr(waterzy.quarter4th.zonghe, 'name', 'result', true)
            },
            sthj: {
              first: getFixedArr(sthjzy.quarter1th.zonghe, 'name', 'result', true),
              second: getFixedArr(sthjzy.quarter2th.zonghe, 'name', 'result', true),
              third: getFixedArr(sthjzy.quarter3th.zonghe, 'name', 'result', true),
              forth: getFixedArr(sthjzy.quarter4th.zonghe, 'name', 'result', true)
            },
          }
          setDefaultOptions({
            url: `http://114.55.165.49/arcgis/3.17/init.js`
          });
          self.configCurrentTimmer();
          self.initWea();
          self.initMap();
          self.needData = allzy.quarter4th;
          self.tabDetail = self.needData.bottomObj.tdzy;
          self.initData();
          localStorage.setItem('INDEXINFO', JSON.stringify({
            allzy,
            resultObj,
            tudizy,
            waterzy,
            sthjzy
          }))
        }));
    },
    getAllZonghe(arr1, arr2, arr3) {
      let arr = [],
        arrChild1 = [],
        arrChild2 = [],
        arrChild3 = [];
      for (let i in arr1) {
        let newObj = {};
        arrChild1 = arr1[i]['child'];
        newObj['name'] = arr1[i]['name'];
        newObj['land'] = arr1[i]['result'];
        for (let j in arr2) {
          if (arr1[i]['name'] == arr2[j]['name']) {
            arrChild2 = arr2[j]['child'];
            newObj['water'] = arr2[j]['result'];
          }
        }
        for (let k in arr3) {
          if (arr1[i]['name'] == arr3[k]['name']) {
            arrChild3 = arr3[k]['child'];
            newObj['sthj'] = arr3[k]['result'];
          }
        }
        newObj['child'] = this.getAllChild(arrChild1, arrChild2, arrChild3)
        arr.push(newObj);
      }
      for (let i in arr) {
        arr[i]['result'] = checkAll(arr[i]['land'], arr[i]['water'], arr[i]['sthj']);
      }
      return arr;
    },
    getAllChild(arr1, arr2, arr3) {
      let arr = [];
      for (let i in arr1) {
        let newObj = {};
        newObj['name'] = arr1[i]['name'];
        newObj['land'] = arr1[i]['result'];
        for (let j in arr2) {
          if (arr1[i]['name'] == arr2[j]['name']) {
            newObj['water'] = arr2[j]['result'];
          }
        }
        for (let k in arr3) {
          if (arr1[i]['name'] == arr3[k]['name']) {
            newObj['sthj'] = arr3[k]['result'];
          }
        }
        arr.push(newObj);
      }
      for (let i in arr) {
        arr[i]['result'] = checkAll(arr[i]['land'], arr[i]['water'], arr[i]['sthj']);
      }
      return arr;
    },
    getZonghe(arr1, arr2, arr3, type) {
      let arr = [];
      for (let i = 0; i < arr1.length; i++) {
        let obj = {};
        if (type == 'land') {
          obj = {
            name: arr1[i]['镇名'],
            buildRes: arr1[i]['建设用地压力状态'],
            cultivatedLandRes: arr1[i]['耕地开发压力状态'],
            area: filterSum(arr1[i], arr2, '土地面积（平方千米）'),
            result: checkLand(arr1[i]['建设用地压力状态'], arr1[i]['耕地开发压力状态']),
            child: this.getChild(filterCunArr(arr1[i]['镇名'], arr3), arr2, type)
          }
        } else if (type == 'water') {
          obj = {
            name: arr1[i]['镇名'],
            waterRes: checkWater(arr1[i]['水资源承载指数'], arr1[i]['水土资源匹配指数']),
            area: filterSum(arr1[i], arr2, '水资源面积（平方千米）'),
            result: checkWater(arr1[i]['水资源承载指数'], arr1[i]['水土资源匹配指数']),
            child: this.getChild(filterCunArr(arr1[i]['镇名'], arr3), arr2, type)
          }
        } else if (type == 'ambient') {
          obj = {
            name: arr1[i]['镇名'],
            fd: mathNum(arr1[i]['生境质量指数'], 3),
            fg: mathNum(arr1[i]['植被覆盖指数'], 3),
            xp: mathNum(arr1[i]['土地胁迫指数'], 3),
            fh: mathNum(arr1[i]['污染负荷指数'], 3),
            result: checkSthj(arr1[i]['生境质量指数'], arr1[i]['植被覆盖指数'], arr1[i]['土地胁迫指数'], arr1[i]['污染负荷指数']),
            child: this.getChild(filterCunArr(arr1[i]['镇名'], arr3), arr2, type)
          }
        }
        arr.push(obj);
      }
      return arr;
    },
    getChild(arr, arr2, type) {
      let newArr = [];
      for (let i in arr) {
        let obj = {};
        if (type == 'land') {
          obj = {
            name: arr[i]['村名'],
            developmentLevel: mathNum(arr[i]['建设用地现状开发程度'], 3),
            matchingDegree: mathNum(arr[i]['现状建设用地布局匹配度'], 3),
            landProductivity: mathNum(arr[i]['人均耕地生产能力（亩/人）'], 3),
            utilizeLandDegree: mathNum(arr[i]['耕地开发利用程度'], 3),
            buildRes: arr[i]['建设用地压力状态'],
            cultivatedLandRes: arr[i]['耕地开发压力状态'],
            result: checkLand(arr[i]['建设用地压力状态'], arr[i]['耕地开发压力状态'])
          }
          for (let j in arr2) {
            if (arr2[j]['村名'] == arr[i]['村名']) {
              obj['area'] = mathNum(arr2[j]['土地面积（平方千米）'], 3)
            }
          }
        } else if (type == 'water') {
          obj = {
            name: arr[i]['村名'],
            agricultureWater: mathNum(arr[i]['水资源承载指数'], 3),
            matchingDegree: mathNum(arr[i]['水土资源匹配指数'], 3),
            waterRes: checkWater(arr[i]['水资源承载指数'], arr[i]['水土资源匹配指数']),
            result: checkWater(arr[i]['水资源承载指数'], arr[i]['水土资源匹配指数'])
          }
          for (let j in arr2) {
            if (arr2[j]['村名'] == arr[i]['村名']) {
              obj['area'] = mathNum(arr2[j]['水资源面积（平方千米）'], 3)
            }
          }
        } else if (type == 'ambient') {
          obj = {
            name: arr[i]['村名'],
            fd: mathNum(arr[i]['生境质量指数'], 3),
            fg: mathNum(arr[i]['植被覆盖指数'], 3),
            xp: mathNum(arr[i]['土地胁迫指数'], 3),
            fh: mathNum(arr[i]['污染负荷指数'], 3),
            result: checkSthj(arr[i]['生境质量指数'], arr[i]['植被覆盖指数'], arr[i]['土地胁迫指数'], arr[i]['污染负荷指数'])
          }
        }
        newArr.push(obj);
      }
      return newArr;
    },
    getAllCenter(obj, type) {
      let arr = [];
      for (let i in obj) {
        let newObj = {
          name: obj[i]['name'],
          type: this.transformationType(obj[i][type]),
          number: obj[i][type] == 1 ? 1 : (obj[i][type] == 0) ? 0.5 : 0
        };
        arr.push(newObj);
      }
      return arr;
    },
    transformationType(type) {
      let str = '';
      if (type == 1) {
        str = '可载';
      } else if (type == 0) {
        str = '临界';
      } else if (type == -1) {
        str = '超载';
      }
      return str;
    },
    configCurrentTimmer: function () { //获取当前动态时间
      let vSelf = this;
      this.curTime = new Date().getTime() / 1000;
      setTimeout(vSelf.configCurrentTimmer, 1000);
    },
    initMap() {
      let self = this
      loadModules(['esri/map', "esri/layers/TileInfo", "esri/dijit/Popup", "esri/layers/WebTiledLayer",
          "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/tasks/query", "esri/tasks/QueryTask"
        ], {
          css: true
        })
        .then(([Map, TileInfo, Popup, WebTiledLayer, GraphicsLayer, Point, Query, QueryTask]) => {
          self.tileInfo = new TileInfo({
            dpi: 90.71428571427429,
            rows: 256,
            cols: 256,
            compressionQuality: 0,
            origin: {
              x: -180,
              y: 90
            },
            spatialReference: {
              wkid: 4326
            },
            lods: [{
                level: 2,
                levelValue: 2,
                resolution: 0.3515625,
                scale: 147748796.52937502
              },
              {
                level: 3,
                levelValue: 3,
                resolution: 0.17578125,
                scale: 73874398.264687508
              },
              {
                level: 4,
                levelValue: 4,
                resolution: 0.087890625,
                scale: 36937199.132343754
              },
              {
                level: 5,
                levelValue: 5,
                resolution: 0.0439453125,
                scale: 18468599.566171877
              },
              {
                level: 6,
                levelValue: 6,
                resolution: 0.02197265625,
                scale: 9234299.7830859385
              },
              {
                level: 7,
                levelValue: 7,
                resolution: 0.010986328125,
                scale: 4617149.8915429693
              },
              {
                level: 8,
                levelValue: 8,
                resolution: 0.0054931640625,
                scale: 2308574.9457714846
              },
              {
                level: 9,
                levelValue: 9,
                resolution: 0.00274658203125,
                scale: 1154287.4728857423
              },
              {
                level: 10,
                levelValue: 10,
                resolution: 0.001373291015625,
                scale: 577143.73644287116
              },
              {
                level: 11,
                levelValue: 11,
                resolution: 0.0006866455078125,
                scale: 288895.277144
              },
              {
                level: 12,
                levelValue: 12,
                resolution: 0.00034332275390625,
                scale: 144447.638572
              },
              {
                level: 13,
                levelValue: 13,
                resolution: 0.000171661376953125,
                scale: 72223.819286
              },
              {
                level: 14,
                levelValue: 14,
                resolution: 8.58306884765625e-005,
                scale: 36111.909643
              },
              {
                level: 15,
                levelValue: 15,
                resolution: 4.291534423828125e-005,
                scale: 18055.954822
              },
              {
                level: 16,
                levelValue: 16,
                resolution: 2.1457672119140625e-005,
                scale: 9027.977411
              },
              {
                level: 17,
                levelValue: 17,
                resolution: 1.0728836059570313e-005,
                scale: 4508.9354409599309
              },
              {
                level: 18,
                levelValue: 18,
                resolution: 5.3644180297851563e-006,
                scale: 2254.4677204799655
              },
              {
                level: 19,
                levelValue: 19,
                resolution: 2.68220901489257815e-006,
                scale: 1127.23386023998275
              },
              {
                level: 20,
                levelValue: 2,
                resolution: 1.341104507446289075e-006,
                scale: 563.616930119991375
              },
              {
                level: 21,
                levelValue: 21,
                resolution: 6.7055225372314475e-007,
                scale: 281.80846505999569
              }
            ]
          });
          map = new Map('mapName', {
            center: [108.5, 34],
            zoom: 9,
            maxZoom: 21,
            spatialReference: {
              wkid: 4326
            },
            logo: false,
            // infoWindow: popup

          });
          // 加载经纬度矢量底图
          layera = WebTiledLayer(this.td1_satellite, {
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo: self.tileInfo,
            id: 'layera'
          });
          // 加载经纬度矢量中文注记（配合矢量底图使用）
          layerb = WebTiledLayer(this.td2_satellite, {
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo: self.tileInfo,
            id: 'layerb'
          });
          map.addLayers([layera, layerb]);
          self.point = new Point({
            x: 119.97,
            y: 30.53,
            spatialReference: {
              wkid: 4326
            }
          });
          map.centerAt(self.point);
          if (localStorage.getItem('ZHENPOINTS') == null) {
            var query = new Query();
            query.outFields = ["*"];
            query.where = "1=1";
            query.returnGeometry = true;
            var queryTask = new QueryTask(self.borderUrl + "/0");
            queryTask.execute(query, function (result) {
              zhenPoints = [];
              for (let i in result.features) {
                let obj = {
                  name: result.features[i].attributes.XZQMC,
                  ring: result.features[i].geometry.rings
                }
                zhenPoints.push(obj);
              }
              localStorage.setItem('ZHENPOINTS', JSON.stringify({
                zhenPoints
              }));
              self.addCoverage();
            });
          } else {
            zhenPoints = JSON.parse(localStorage.getItem('ZHENPOINTS')).zhenPoints;
            self.addCoverage();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //添加图层
    addCoverage() {
      let self = this;
      loadModules(["esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISDynamicMapServiceLayer",
          "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters"
        ], {
          css: true
        })
        .then(([ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, IdentifyTask, IdentifyParameters]) => {
          bgLayer = new ArcGISTiledMapServiceLayer(self.bgLayerUrl, {
            id: "bgLayer"
          });
          let layerMap = [bgLayer];
          map.addLayers(layerMap)
          map.centerAt(self.point);
          map.on('zoom-end', function (event) {
            if (borderLayer) {
              map.removeLayer(borderLayer);
            }
            // if (graphicsLayer) {
            //   map.removeLayer(graphicsLayer);
            // }
            if (event.level > 9) {
              self.borderUrl =
                'http://183.129.170.180:6080/arcgis/rest/services/luoshe/deqing_cunjie/MapServer';
            } else {
              self.borderUrl =
                'http://183.129.170.180:6080/arcgis/rest/services/luoshe/deqing_zhenjie/MapServer';
              // self.addGraphicsLayer();
            }
            borderLayer = new ArcGISDynamicMapServiceLayer(self.borderUrl, {
              id: "borderUrl"
            });
            map.addLayer(borderLayer);
          })
          borderLayer = new ArcGISDynamicMapServiceLayer(self.borderUrl, {
            id: "borderUrl"
          });
          map.addLayer(borderLayer);
          showArr = resultObj.all.forth.land;
          self.addGraphicsLayer();
          map.on('click', function (event) {
            if (measureFlag) {
              return;
            }
            showLoading("拼命加载中...");
            let identifyTask = new IdentifyTask(self.borderUrl);
            let identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 0;
            identifyParams.returnGeometry = true;
            identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.width = map.width;
            identifyParams.height = map.height;
            identifyParams.geometry = event.mapPoint;
            identifyParams.mapExtent = map.extent;
            var deferred = identifyTask.execute(identifyParams).addCallback(function (response) {
              if (response) {
                hideLoading();
                // console.log(response);
                let QMC;
                self.mapChildData = [];
                if (response.length == 2) {
                  QMC = response[0].feature.attributes.CQMC;
                  if (self.needData.zonghe.length > 0) {
                    for (let i = 0; i < self.needData.zonghe.length; i++) {
                      if (self.needData.zonghe[i].name == response[0].feature.attributes.XZQMC) {
                        if (self.needData.zonghe[i].child && self.needData.zonghe[i].child.length > 0) {
                          for (let j = 0; j < self.needData.zonghe[i].child.length; j++) {
                            if (QMC == self.needData.zonghe[i].child[j].name) {
                              self.mapChildData.push(self.needData.zonghe[i].child[j]);
                            }
                          }
                        }
                      }
                    }
                  }
                } else if (response.length == 1) {
                  QMC = response[0].feature.attributes.XZQMC;
                  if (self.needData.zonghe.length > 0) {
                    for (let i = 0; i < self.needData.zonghe.length; i++) {
                      if (self.needData.zonghe[i].name == response[0].feature.attributes.XZQMC) {
                        self.mapChildData = self.needData.zonghe[i].child;
                      }
                    }
                  }
                } else {
                  return;
                }
                if (self.selectedIndex == 0 || self.selectedIndex == 1) {
                  self.mapDiaTitle = QMC + '土地综合承载力评价';
                } else if (self.selectedIndex == 2) {
                  self.mapDiaTitle = QMC + '水资源单指标承载状态';
                } else if (self.selectedIndex == 3) {
                  self.mapDiaTitle = QMC + '生态环境资源单指标承载状态';
                }
                self.mapTypepop = self.selectedIndex.toString();
                self.mapDiaShow = true;
              }
            })
          })
        })
    },
    initWea() { //获取天气
      window.WIDGET = {
        CONFIG: {
          "layout": 1,
          "width": "400",
          "height": "100",
          "background": 1,
          "dataColor": "FFFFFF",
          "language": "zh",
          "city": "CN101210204",
          "key": "pELjfJMzWA"
        }
      };
      (function (d) {
        var c = d.createElement('link')
        c.rel = 'stylesheet'
        c.href = 'https://apip.weatherdt.com/standard/static/css/weather-standard.css?v=2.0'
        var s = d.createElement('script')
        s.src = 'https://apip.weatherdt.com/standard/static/js/weather-standard.js?v=2.0'
        var sn = d.getElementsByTagName('script')[0]
        sn.parentNode.insertBefore(c, sn)
        sn.parentNode.insertBefore(s, sn)
      })(document)
    },
    initData() {
      let pieChart = this.$echarts.init(document.querySelector(".pie"));
      let pieX = [],
        pieY = [],
        barX = [],
        barY = [],
        barBottomX = [],
        barBottomY = [];
      let townList = this.needData.topObj.townList;
      if (townList.length > 0) {
        for (let i = 0; i < townList.length; i++) {
          pieX.push(townList[i]['type']);
          let newobj = {
            value: townList[i].number,
            name: townList[i].type
          };
          pieY.push(newobj);
        }
      }
      pieChart.setOption(
        setPieOption(pieX, pieY)
      );
      if (this.selectedIndex != 3) {
        let centerArr = this.needData.centerArr;
        if (centerArr.length > 0) {
          for (let i = 0; i < centerArr.length; i++) {
            barX.push(centerArr[i]['name']);
            let newobj = {
              value: centerArr[i].number,
              name: centerArr[i].name,
              type: centerArr[i].type
            };
            barY.push(newobj);
          }
        }
      }

      if (this.selectedIndex == 0) {
        let barCenterChart = this.$echarts.init(document.querySelector(".bar-center"));
        barCenterChart.setOption(setHomeBarOption('德清县土地综合承载力状态', barX, barY, true));
        window.onresize = function () {
          barCenterChart.resize();
        }
        let div = document.querySelector(".show-bar > div");
        if (div) {
          div.style.display = 'block'
        }
      } else if (this.selectedIndex == 1 || this.selectedIndex == 2) {
        let barCenterChart = this.$echarts.init(document.querySelector(".bar-center"));
        let barBottomChart = this.$echarts.init(document.querySelector(".bar-bottom"));
        let bottomArr = this.needData.bottomObj;
        if (bottomArr.length > 0) {
          for (let i = 0; i < bottomArr.length; i++) {
            barBottomX.push(bottomArr[i]['name']);
            let newobj = {
              value: bottomArr[i].number,
              name: bottomArr[i].name,
              type: bottomArr[i].type
            };
            barBottomY.push(newobj);
          }
        }
        if (this.selectedIndex == 1) {
          barCenterChart.setOption(setHomeBarOption('德清县现状建设用地布局匹配度', barX, barY));
          barBottomChart.setOption(setHomeBarOption('德清县耕地开发利用程度', barBottomX, barBottomY))
        } else if (this.selectedIndex == 2) {
          barCenterChart.setOption(setHomeBarOption('德清县水资源承载指数', barX, barY));
          barBottomChart.setOption(setHomeBarOption('德清县水资源匹配指数', barBottomX, barBottomY))
        }
        window.onresize = function () {
          barCenterChart.resize();
          barBottomChart.resize();
        }
        let div = document.querySelector(".show-bar > div");
        if (div) {
          div.style.display = 'block'
        }
      } else if (this.selectedIndex == 3) {
        let arr1X = [],
          arr2X = [],
          arr3X = [],
          arr4X = [],
          arr1Y = [],
          arr2Y = [],
          arr3Y = [],
          arr4Y = [];
        let fd = this.needData.centerArr.fd;
        let fg = this.needData.centerArr.fg;
        let xp = this.needData.centerArr.xp;
        let fh = this.needData.centerArr.fh;
        for (let i = 0; i < fd.length; i++) {
          arr1X.push(fd[i]['name']);
          arr1Y.push(fd[i]['number']);
        }
        for (let i = 0; i < fg.length; i++) {
          arr2X.push(fg[i]['name']);
          arr2Y.push(fg[i]['number']);
        }
        for (let i = 0; i < xp.length; i++) {
          arr3X.push(xp[i]['name']);
          arr3Y.push(xp[i]['number']);
        }
        for (let i = 0; i < fh.length; i++) {
          arr4X.push(fh[i]['name']);
          arr4Y.push(fh[i]['number']);
        }
        let barCenterChart1 = this.$echarts.init(document.querySelector(".bar-fd"));
        let barCenterChart2 = this.$echarts.init(document.querySelector(".bar-fg"));
        let barCenterChart3 = this.$echarts.init(document.querySelector(".bar-xp"));
        let barCenterChart4 = this.$echarts.init(document.querySelector(".bar-fh"));

        barCenterChart1.setOption(setBarOption('德清县生境质量指数', '#5EBE67', arr1X, arr1Y));
        barCenterChart2.setOption(setBarOption('德清县植被覆盖指数', '#55BFC0', arr2X, arr2Y));
        barCenterChart3.setOption(setBarOption('德清县土地胁迫指数', '#3C90F7', arr3X, arr3Y));
        barCenterChart4.setOption(setBarOption('德清县污染负荷指数', '#FFE150', arr4X, arr4Y));
        window.onresize = function () {
          barCenterChart1.resize();
          barCenterChart2.resize();
          barCenterChart3.resize();
          barCenterChart4.resize();
        }
        let div = document.querySelector(".show-bar2 > div");
        if (div) {
          div.style.display = 'none'
        }
      }
      window.onresize = function () {
        pieChart.resize();
      }
    },
    backHome() {
      this.$router.push({
        path: '/'
      })
    },
    changeType(type) { //切换底图
      this.selectTC = type;
      loadModules(["esri/layers/WebTiledLayer"], {
          css: true
        })
        .then(([WebTiledLayer]) => {
          map.removeLayer(layera);
          map.removeLayer(layerb);
          let td1;
          let td2;
          //二维
          if (this.selectTC == '2d') {
            td1 = this.td1_2d
            td2 = this.td2_2d
            if (bgLayer) {
              bgLayer.hide()
            }
          } else {
            td1 = this.td1_satellite
            td2 = this.td2_satellite
            if (bgLayer) {
              bgLayer.show()
            }
          }
          layera = WebTiledLayer(td1, {
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo: this.tileInfo,
            id: 'layera'
          });
          layerb = WebTiledLayer(td2, {
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo: this.tileInfo,
            id: 'layerb'
          });
          map.addLayer(layera, 0);
          map.addLayer(layerb, 1);
        })
    },
    //移除图斑
    clearMapGrahpics() {
      map && map.graphics && map.graphics.clear();
    },
    drawImg(flag) {
      loadModules(["esri/toolbars/draw",
          "esri/symbols/SimpleLineSymbol",
          "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/graphic",
        ], {
          css: true
        })
        .then(([Draw, SimpleLineSymbol, SimpleFillSymbol, Color, Graphic]) => {
          let that = this;
          that.clearMapGrahpics();
          measureFlag = true;
          if (flag == 'line') {
            //画线
            let draw = new Draw(map);
            draw.activate(Draw.POLYLINE);
            draw.on("draw-complete", function (evt) {
              // console.log(evt.geometry);
              let line = new SimpleLineSymbol("solid", new Color('#4D87FF'), 2);
              map.graphics.add(new Graphic(evt.geometry, line));
              draw.deactivate();
              that.measureAreaorLength(evt, "line");
            })
          } else if (flag == 'area') {
            let draw = new Draw(map);
            //画面
            draw.activate(Draw.POLYGON);
            draw.on("draw-complete", function (evt) {
              let fill = new SimpleFillSymbol("solid", new SimpleLineSymbol("solid", new Color('#4D87FF'), 2),
                new Color('rgba(0,0,0,0.4)'));
              map.graphics.add(new Graphic(evt.geometry, fill));
              draw.deactivate();
              that.measureAreaorLength(evt, "area");
            })
          } else if (flag == 'all') {
            if (that.selectedIndex == 0) {
              that.diaTitle = "德清县土地综合承载力评价";
              that.listData = that.needData.zonghe;
            } else if (that.selectedIndex == 1) {
              that.diaTitle = "德清县土地资源单指标承载状态";
              that.listData = that.needData.zonghe;
            } else if (that.selectedIndex == 2) {
              that.diaTitle = "德清县水资源单指标承载状态";
              that.listData = that.needData.zonghe;
            } else if (that.selectedIndex == 3) {
              that.diaTitle = "德清县生态环境资源单指标承载状态";
              that.listData = that.needData.zonghe;
            }
            measureFlag = false;
            that.dataShow = true;
          } else if (flag == 'warn') {
            if (that.selectedIndex == 0) {
              that.warnDiaTitle = "德清县土地综合承载力预警";
              that.warnData = allzy.warning;
            } else if (that.selectedIndex == 1) {
              that.warnDiaTitle = "德清县土地资源单指标承载状态预警";
              that.warnData = tudizy.warning;
            } else if (that.selectedIndex == 2) {
              that.warnDiaTitle = "德清县水资源单指标承载状态预警";
              that.warnData = waterzy.warning;
            } else if (that.selectedIndex == 3) {
              that.warnDiaTitle = "德清县生态环境资源单指标承载状态预警";
              that.warnData = sthjzy.warning;
            }
            measureFlag = false;
            that.warnDataShow = true;
          } else if (flag == 'none') {
            measureFlag = false;
          }
        })
    },
    //地图测量
    measureAreaorLength(evt, geometrytype) {
      loadModules(["esri/tasks/GeometryService", "esri/symbols/Font", "esri/tasks/LengthsParameters",
          "esri/symbols/TextSymbol", "esri/Color", "esri/geometry/Point", "esri/graphic",
          "esri/tasks/AreasAndLengthsParameters",
        ], {
          css: true
        })
        .then(([GeometryService, Font, LengthsParameters, TextSymbol, Color, Point, Graphic,
          AreasAndLengthsParameters
        ]) => {
          //判断是测距还是测面
          var geoservice = new GeometryService(geoserviceUrl);
          var font = new Font();
          font.setSize(20);
          font.setWeight(Font.WEIGHT_BOLD);
          if (geometrytype == "line") {
            var lengthParams = new LengthsParameters();
            lengthParams.lengthUnit = GeometryService.UNIT_METER;
            lengthParams.geodesic = true;
            lengthParams.polylines = [evt.geometry];
            //参数传入方法中
            geoservice.lengths(lengthParams, function (res) { //成功时回调函数
              var text = new TextSymbol(Number(res.lengths[0]).toFixed(3) + '米');
              text.setColor(new Color([255, 0, 0]));
              text.setFont(font);
              var textLocation = evt && evt.geometry && evt.geometry.paths && evt.geometry.paths[0][evt.geometry
                .paths[0].length - 1
              ];
              var points = new Point(textLocation, {
                spatialReference: {
                  wkid: 4326
                }
              });
              map.graphics.add(new Graphic(points, text));
            }, function (err) {

            });
          } else if (geometrytype == "area") {
            var areasAndLengthParams = new AreasAndLengthsParameters();
            areasAndLengthParams.areaUnit = GeometryService.UNIT_SQUARE_METERS;
            //参数传入方法中
            geoservice.simplify([evt.geometry], function (simplifiedGeometries) {
              areasAndLengthParams.polygons = simplifiedGeometries;
              geoservice.areasAndLengths(areasAndLengthParams, function (res) { //成功时回调函数
                var text = new TextSymbol(Number(res.areas[0]).toFixed(2) + "平方米");
                text.setColor(new Color([255, 0, 0]));
                text.setFont(font);
                var textLocation = evt && evt.geometry && evt.geometry.rings && evt.geometry.rings[0][evt
                  .geometry
                  .rings[0].length - 1
                ];
                var points = new Point(textLocation, {
                  spatialReference: {
                    wkid: 4326
                  }
                });
                map.graphics.add(new Graphic(points, text));
              });
            }, function (err) {
              console.log(err)
            });
          }
          // 测量完成将标志重置
          measureFlag = false;
        })
    },
    changeIndex(index) { //顶部tab切换
      this.selectedIndex = index;
      if (this.seasonVal == 1) {
        if (this.selectedIndex == 0) {
          this.tabTitle = "土地";
          this.tabAselect = 0;
          this.needData = allzy.quarter1th;
          this.tabDetail = this.needData.bottomObj.tdzy;
          showArr = resultObj.all.first.land;
        } else if (this.selectedIndex == 1) {
          this.needData = tudizy.quarter1th;
          showArr = resultObj.land.first;
        } else if (this.selectedIndex == 2) {
          this.needData = waterzy.quarter1th;
          showArr = resultObj.water.first;
        } else if (this.selectedIndex == 3) {
          this.needData = sthjzy.quarter1th;
          showArr = resultObj.sthj.first;
        }
      } else if (this.seasonVal == 2) {
        if (this.selectedIndex == 0) {
          this.tabTitle = "土地";
          this.tabAselect = 0;
          this.needData = allzy.quarter2th;
          this.tabDetail = this.needData.bottomObj.tdzy;
          showArr = resultObj.all.second.land;
        } else if (this.selectedIndex == 1) {
          this.needData = tudizy.quarter2th;
          showArr = resultObj.land.second;
        } else if (this.selectedIndex == 2) {
          this.needData = waterzy.quarter2th;
          showArr = resultObj.water.second;
        } else if (this.selectedIndex == 3) {
          this.needData = sthjzy.quarter2th;
          showArr = resultObj.sthj.second;
        }
      } else if (this.seasonVal == 3) {
        if (this.selectedIndex == 0) {
          this.tabTitle = "土地";
          this.tabAselect = 0;
          this.needData = allzy.quarter3th;
          this.tabDetail = this.needData.bottomObj.tdzy;
          showArr = resultObj.all.third.land;
        } else if (this.selectedIndex == 1) {
          this.needData = tudizy.quarter3th;
          showArr = resultObj.land.third;
        } else if (this.selectedIndex == 2) {
          this.needData = waterzy.quarter3th;
          showArr = resultObj.water.third;
        } else if (this.selectedIndex == 3) {
          this.needData = sthjzy.quarter3th;
          showArr = resultObj.sthj.third;
        }
      } else {
        if (this.selectedIndex == 0) {
          this.tabTitle = "土地";
          this.tabAselect = 0;
          this.needData = allzy.quarter4th;
          this.tabDetail = this.needData.bottomObj.tdzy;
          showArr = resultObj.all.forth.land;
        } else if (this.selectedIndex == 1) {
          this.needData = tudizy.quarter4th;
          showArr = resultObj.land.forth;
        } else if (this.selectedIndex == 2) {
          this.needData = waterzy.quarter4th;
          showArr = resultObj.water.forth;
        } else if (this.selectedIndex == 3) {
          this.needData = sthjzy.quarter4th;
          showArr = resultObj.sthj.forth;
        }
      }
      this.addGraphicsLayer();
      this.$nextTick(() => {
        this.initData();
      })
    },
    tabAchange(index) { //首页底部左下角tab切换
      this.tabAselect = index;
      let newObj;
      if (this.tabAselect == 0) {
        this.tabTitle = "土地";
        this.tabDetail = this.needData.bottomObj.tdzy;
        if (this.seasonVal == 1) {
          newObj = resultObj.all.first;
        } else if (this.seasonVal == 2) {
          newObj = resultObj.all.second;
        } else if (this.seasonVal == 3) {
          newObj = resultObj.all.third;
        } else {
          newObj = resultObj.all.forth;
        }
        showArr = newObj.land;
      } else if (this.tabAselect == 1) {
        this.tabTitle = "水";
        this.tabDetail = this.needData.bottomObj.szy;
        if (this.seasonVal == 1) {
          newObj = resultObj.all.first;
        } else if (this.seasonVal == 2) {
          newObj = resultObj.all.second;
        } else if (this.seasonVal == 3) {
          newObj = resultObj.all.third;
        } else {
          newObj = resultObj.all.forth;
        }
        showArr = newObj.water;
      } else {
        this.tabTitle = "生态环境";
        this.tabDetail = this.needData.bottomObj.stzy;
        if (this.seasonVal == 1) {
          newObj = resultObj.all.first;
        } else if (this.seasonVal == 2) {
          newObj = resultObj.all.second;
        } else if (this.seasonVal == 3) {
          newObj = resultObj.all.third;
        } else {
          newObj = resultObj.all.forth;
        }
        showArr = newObj.sthj;
      }
      this.addGraphicsLayer();
    },
    seasonChange(val) {
      let newdata;
      if (this.selectedIndex == 0) {
        newdata = allzy;
        if (val == 1) {
          if (this.tabAselect == 0) {
            showArr = resultObj.all.first.land;
          } else if (this.tabAselect == 1) {
            showArr = resultObj.all.first.water;
          } else {
            showArr = resultObj.all.first.sthj;
          }
          this.needData = newdata.quarter1th;
        } else if (val == 2) {
          if (this.tabAselect == 0) {
            showArr = resultObj.all.second.land;
          } else if (this.tabAselect == 1) {
            showArr = resultObj.all.second.water;
          } else {
            showArr = resultObj.all.second.sthj;
          }
          this.needData = newdata.quarter2th;
        } else if (val == 3) {
          if (this.tabAselect == 0) {
            showArr = resultObj.all.third.land;
          } else if (this.tabAselect == 1) {
            showArr = resultObj.all.third.water;
          } else {
            showArr = resultObj.all.third.sthj;
          }
          this.needData = newdata.quarter3th;
        } else {
          if (this.tabAselect == 0) {
            showArr = resultObj.all.forth.land;
          } else if (this.tabAselect == 1) {
            showArr = resultObj.all.forth.water;
          } else {
            showArr = resultObj.all.forth.sthj;
          }
          this.needData = newdata.quarter4th;
        }
        if (this.tabAselect == 0) {
          this.tabDetail = this.needData.bottomObj.tdzy;
        } else if (this.tabAselect == 1) {
          this.tabDetail = this.needData.bottomObj.szy;
        } else {
          this.tabDetail = this.needData.bottomObj.stzy;
        }
      } else {
        if (this.selectedIndex == 1) {
          newdata = tudizy;
        } else if (this.selectedIndex == 2) {
          newdata = waterzy;
        } else {
          newdata = sthjzy;
        }
        if (val == 1) {
          showArr = resultObj.all.first.sthj;
          this.needData = newdata.quarter1th;
        } else if (val == 2) {
          showArr = resultObj.all.second.sthj;
          this.needData = newdata.quarter2th;
        } else if (val == 3) {
          showArr = resultObj.all.third.sthj;
          this.needData = newdata.quarter3th;
        } else {
          showArr = resultObj.all.forth.sthj;
          this.needData = newdata.quarter4th;
        }
      }
      this.addGraphicsLayer();
      this.$nextTick(() => {
        this.initData();
      })
    },
    addGraphicsLayer() {
      if (graphicsLayer) {
        map.removeLayer(graphicsLayer);
      }
      let self = this;
      loadModules(["esri/graphic", "esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color"], {
          css: true
        })
        .then(([Graphic, GraphicsLayer, Polygon, SimpleLineSymbol, SimpleFillSymbol, Color]) => {
          graphicsLayer = new GraphicsLayer();
          map.addLayer(graphicsLayer);
          let newArr = zhenPoints.slice();
          let lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 2);
          let fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol, new Color([60, 144, 247, 0.5]));
          let fill2 = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol, new Color([85, 191, 192, 0.5]));
          let fill3 = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol, new Color([94, 190, 103, 0.5]));
          for (let i in newArr) {
            for (let j in showArr) {
              if (newArr[i]['name'] == showArr[j]['name']) {
                newArr[i]['type'] = showArr[j]['type'];
              }
            }
          }
          let arr = [];
          for (let i in newArr) {
            if (newArr[i]['type'] == '超载') {
              arr.push(
                new Graphic(new Polygon({
                  "rings": newArr[i].ring,
                  "spatialReference": map.spatialReference
                }), fill)
              );
            } else if (newArr[i]['type'] == '临界') {
              arr.push(
                new Graphic(new Polygon({
                  "rings": newArr[i].ring,
                  "spatialReference": map.spatialReference
                }), fill2)
              );
            } else {
              arr.push(
                new Graphic(new Polygon({
                  "rings": newArr[i].ring,
                  "spatialReference": map.spatialReference
                }), fill3)
              );
            }
          }
          for (let i in arr) {
            graphicsLayer.add(arr[i]);
          }
        })
    },
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
