<template>
<div id="home">
  <div style="position: relative;">
    <div class="header-dev" style="background: #010C28;">
      <div style="background: #0B1F86; position: absolute; width: 100%; height: 8px;"></div>
      <img src="../../assets/image/logo.png" />
      <span class="curr-date">{{nowData | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
      <el-button type="text" style="position: absolute;right: 20px;top: 30px" @click="backIndex">返回首页
      </el-button>
    </div>
  </div>
  <div class="show-flex-r content-box">
    <div style="width: 30%">
      <div class="fix-style">
        <lineCpn></lineCpn>
        <div class="bar1" style="width: 100%;height: 100%"></div>
        <lineCpn></lineCpn>
      </div>
      <div class="fix-style">
        <lineCpn></lineCpn>
        <div class="bar3" style="width: 100%;height: 100%"></div>
        <lineCpn></lineCpn>
      </div>
      <div :class="{'fix-style': tabIndex == 2 ? true : false,'fix-table-style': tabIndex == 1 ? true : false}">
        <div class="table1 table-common-style" v-if="tabIndex == 1">
          <h3 v-if="reaData && reaData.table.length > 0" class="text-center font-size18" style="margin-bottom: 20px">
            建设用地压力状态</h3>
          <boxCpn v-if="tabIndex == 1 &&  reaData && reaData.table.length > 0" style="position: absolute;left: 44px;top: 60px; width: calc(100% - 100px);height: calc(100% - 100px);">
          </boxCpn>
          <dl class="side-table table-box">
            <dt class="show-flex-r">
              <span class="flex1 paddingLeft60">镇名</span>
              <span class="flex1">状态</span>
            </dt>
            <dd class="tbody-style table-main">
              <vue-seamless-scroll :data="reaData.table" class="seamless-warp" v-if="reaData && reaData.table" :class-option="classOption">
                <ul class="item">
                  <li v-for="(item,index) in reaData.table" :key="index" class="show-flex-r cursor-style align-center oneLine">
                    <span class="flex1 paddingLeft56">{{item.name}}</span>
                    <span class="flex1 paddingLeft4">{{item.type}}</span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </dd>
          </dl>
        </div>
        <div class="bar5" style="height: 100%;margin-top: 20px;" v-if="tabIndex == 2"></div>
      </div>
    </div>
    <div class="map-box flex1">
      <div class="show-flex-r show-flex-center tab-box">
        <span :class="{'select-tab': tabIndex == 1 ? true : false, 'flex1': true, 'tab-item': true}" @click="tabChange(1)">土地资源</span>
        <span :class="{'select-tab': tabIndex == 2 ? true : false, 'flex1': true, 'tab-item': true}" @click="tabChange(2)">水环境和生态环境</span>
      </div>
      <div id="mapName"></div>
      <div class="table2 table-common-style" v-if="tabIndex == 1">
        <h3 v-if="reaData && reaData.resultData.length > 0" class="text-center font-size18" style="margin: 20px 0">
          {{tableTitle}}
        </h3>
        <boxCpn v-if="reaData && reaData.resultData.length > 0" style="position: absolute;left: 44px;top: 80px;width: calc(100% - 180px);height: calc(100% - 120px);margin-left: 40px">
        </boxCpn>
        <dl class="center-table table-box">
          <dt class="show-flex-r">
            <span class="flex1 paddingLeft120">镇名</span>
            <span class="flex1">状态</span>
          </dt>
          <dd class="tbody-style-center table-main">
            <vue-seamless-scroll :data="reaData.resultData" class="seamless-warp" v-if="reaData && reaData.resultData" :class-option="classOption">
              <ul class="item">
                <li v-for="(item,index) in reaData.table" :key="index" class="show-flex-r cursor-style align-center oneLine">
                  <span class="flex1 paddingLeft116">{{item.name}}</span>
                  <span class="flex1 paddingLeft4">{{item.type}}</span>
                </li>
              </ul>
            </vue-seamless-scroll>
          </dd>
        </dl>
      </div>
      <div v-if="tabIndex == 2" class="show-flex-r table3">
        <div class="flex1 table2-common-style">
          <h3 v-if="reaData && reaData.resultData.length > 0" class="text-center font-size18" style="margin: 20px 0">
            {{tableTitle}}
          </h3>
          <boxCpn v-if="reaData && reaData.resultData.length > 0" style="position: absolute;left: 40px;top: 60px;width: calc(100% - 80px);height: calc(100% - 80px);">
          </boxCpn>
          <dl class="center-table2 table-box">
            <dt class="show-flex-r">
              <span class="flex1 paddingLeft60">镇名</span>
              <span class="flex1">状态</span>
            </dt>
            <dd class="tbody-style-center2 table-main">
              <vue-seamless-scroll :data="reaData.resultData" class="seamless-warp" v-if="reaData && reaData.resultData" :class-option="classOption">
                <ul class="item">
                  <li v-for="(item,index) in reaData.resultData" :key="index" class="show-flex-r cursor-style align-center oneLine">
                    <span class="flex1 paddingLeft56">{{item.name}}</span>
                    <span class="flex1 paddingLeft4">{{item.type}}</span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </dd>
          </dl>
        </div>
        <div class="flex1 table2-common-style">
          <h3 v-if="reaData && reaData.resultData2.length > 0" class="text-center font-size18" style="margin: 20px 0">
            {{tableTitle2}}
          </h3>
          <boxCpn v-if="reaData && reaData.resultData2.length > 0" style="position: absolute;left: 40px;top: 60px;width: calc(100% - 80px);height: calc(100% - 80px);">
          </boxCpn>
          <dl class="center-table2 table-box">
            <dt class="show-flex-r">
              <span class="flex1 paddingLeft60">镇名</span>
              <span class="flex1">状态</span>
            </dt>
            <dd class="tbody-style-center2 table-main">
              <vue-seamless-scroll :data="reaData.resultData2" class="seamless-warp" v-if="reaData && reaData.resultData2" :class-option="classOption">
                <ul class="item">
                  <li v-for="(item,index) in reaData.resultData2" :key="index" class="show-flex-r cursor-style align-center oneLine">
                    <span class="flex1 paddingLeft56">{{item.name}}</span>
                    <span class="flex1 paddingLeft4">{{item.type}}</span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div style="width: 30%">
      <div class="fix-style">
        <lineCpn></lineCpn>
        <div class="bar2" style="width: 100%;height: 100%"></div>
        <lineCpn></lineCpn>
      </div>
      <div class="fix-style">
        <lineCpn></lineCpn>
        <div class="bar4" style="width: 100%;height: 100%"></div>
        <lineCpn></lineCpn>
      </div>
      <div :class="{'fix-style': tabIndex == 2 ? true : false,'fix-table-style': tabIndex == 1 ? true : false}">
        <div class="table4 table-common-style" v-if="tabIndex == 1">
          <h3 v-if="reaData && reaData.table2.length > 0" class="text-center font-size18" style="margin-bottom: 20px">
            耕地开发压力状态</h3>
          <boxCpn v-if="tabIndex == 1 &&  reaData && reaData.table2.length > 0" style="position: absolute;left: 44px;top: 60px; width: calc(100% - 100px);height: calc(100% - 100px);">
          </boxCpn>
          <dl class="side-table table-box">
            <dt class="show-flex-r">
              <span class="flex1 paddingLeft60">镇名</span>
              <span class="flex1">状态</span>
            </dt>
            <dd class="tbody-style table-main">
              <vue-seamless-scroll :data="reaData.table2" class="seamless-warp" v-if="reaData && reaData.table2" :class-option="classOption">
                <ul class="item">
                  <li v-for="(item,index) in reaData.table2" :key="index" class="show-flex-r cursor-style align-center oneLine">
                    <span class="flex1 paddingLeft56">{{item.name}}</span>
                    <span class="flex1 paddingLeft4">{{item.type}}</span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </dd>
          </dl>
        </div>
        <div class="bar6" style="height: 100%;margin-top: 20px;" v-if="tabIndex == 2"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import XLSX from 'xlsx'
import {
  formatDate
} from '@/assets/js/filter.js'
import {
  showLoading,
  hideLoading
} from "@/assets/js/loading";
import {
  setBarOption,
  getEXCEL,
  getFixedArr,
  checkLand,
  checkWater,
  checkSthj
} from '@/assets/js/util.js'
var tdzy, sst;
import {
  loadModules,
  setDefaultOptions
} from 'esri-loader';
var map, layera, layerb, markerLayer, bgLayer, fLayer, borderLayer;
import lineCpn from "@/components/lineCpn"
import boxCpn from "@/components/boxCpn"

export default {
  data() {
    return {
      bgLayerUrl: "http://183.129.170.180:6080/arcgis/rest/services/luoshe/deqing_DOM_an/MapServer", //影像图层
      fLayerUrl: "", //图斑图层
      borderUrl: 'http://183.129.170.180:6080/arcgis/rest/services/luoshe/deqing_zhenjie/MapServer',
      tableTitle: '德清县土地资源承载力状态',
      tableTitle2: '耕地开发压力状态指数',
      reaData: null,
      tabIndex: 1,
      nowData: false,
      point: null,
      tileInfo: null,
      td2_satellite: "http://{subDomain}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles&tk=341fb96634c911d332f700e50e4670d1",
      td1_satellite: "http://{subDomain}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles&tk=341fb96634c911d332f700e50e4670d1"
    }
  },
  components: {
    lineCpn,
    boxCpn
  },
  computed: {
    classOption() {
      return {
        step: 0.3, //数值越大滚动越快
        // direction: 2, //滚动方向：0:向下，1：向上，2：向左，3：向右
        // limitMoveNum: 100, //数据量：listData.length
        // hoverStop: true, //是否开启鼠标悬停stop
        // openWatch: true, //开启数据时监控刷新dom
        // singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        // singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        // waitTime: 1000 // 单步运动停止的时间(默认值1000ms)

      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (localStorage.getItem('DAPING') == null) {
        this.getExcel();
      } else {
        let DAPING = JSON.parse(localStorage.getItem('DAPING'));
        tdzy = DAPING.tdzy;
        sst = DAPING.sst;
        setDefaultOptions({
          url: `http://114.55.165.49/arcgis/3.17/init.js`
        });
        this.configCurrentTimmer();
        this.initMap();
        this.reaData = tdzy;
        this.initCommon();
      }
    },
    getExcel() {
      showLoading("拼命加载中...");
      axios.get("/excels/2019.xlsx", {
          responseType: 'arraybuffer'
        })
        .then((res) => {
          hideLoading();
          let wb = XLSX.read(new Uint8Array(res.data), {
            type: "array"
          })
          // const wsname = wb.SheetNames[2]; //取第一张表
          // const ws = XLSX.utils.sheet_to_json(wb.Sheets[wsname]); //生成json表格内容

          let landZhen = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          let waterZhen = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]]);
          let ambientZhen = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[4]]);
          let landRes = [],
            waterRes = [],
            ambientRes = [];
          tdzy = {
            line1: getFixedArr(landZhen, '镇名', '现状建设用地布局匹配度'),
            line2: getFixedArr(landZhen, '镇名', '人均耕地生产能力（亩/人）'),
            line3: getFixedArr(landZhen, '镇名', '建设用地现状开发程度'),
            line4: getFixedArr(landZhen, '镇名', '耕地开发利用程度'),
            table: getFixedArr(landZhen, '镇名', '建设用地压力状态', true),
            table2: getFixedArr(landZhen, '镇名', '耕地开发压力状态', true)
          }
          // console.log(landZhen);
          for (let i = 0; i < landZhen.length; i++) {
            let obj = {
              name: landZhen[i]['镇名'],
              type: checkLand(landZhen[i]['建设用地压力状态'], landZhen[i]['耕地开发压力状态'])
            }
            landRes.push(obj);
          }
          tdzy.resultData = landRes;
          sst = {
            line1: getFixedArr(waterZhen, '镇名', '水土资源匹配指数'),
            line2: getFixedArr(waterZhen, '镇名', '水资源承载指数'),
            line3: getFixedArr(ambientZhen, '镇名', '土地胁迫指数'),
            line4: getFixedArr(ambientZhen, '镇名', '生境质量指数'),
            line5: getFixedArr(ambientZhen, '镇名', '污染负荷指数'),
            line6: getFixedArr(ambientZhen, '镇名', '植被覆盖指数'),
          }
          for (let i = 0; i < waterZhen.length; i++) {
            let obj2 = {
              name: waterZhen[i]['镇名'],
              type: checkWater(waterZhen[i]['水资源承载指数'], waterZhen[i]['水土资源匹配指数'])
            }
            waterRes.push(obj2);
          }
          for (let i = 0; i < ambientZhen.length; i++) {
            let obj3 = {
              name: ambientZhen[i]['镇名'],
              type: checkSthj(ambientZhen[i]['生境质量指数'], ambientZhen[i]['植被覆盖指数'], ambientZhen[i]['土地胁迫指数'], ambientZhen[i]['污染负荷指数'])
            }
            ambientRes.push(obj3);
          }
          sst.resultData = waterRes;
          sst.resultData2 = ambientRes;
          setDefaultOptions({
            url: `http://114.55.165.49/arcgis/3.17/init.js`
          });
          this.configCurrentTimmer();
          this.initMap();
          this.reaData = tdzy;
          this.initCommon();
          localStorage.setItem('DAPING', JSON.stringify({
            tdzy,
            sst
          }))
        }).catch(err => {
          this.err = err
        })
    },
    configCurrentTimmer() {
      let vSelf = this;
      this.nowData = new Date().getTime() / 1000;
      setTimeout(vSelf.configCurrentTimmer, 1000);
    },
    initMap() {
      let self = this
      loadModules(['esri/map', "esri/layers/TileInfo", "esri/layers/WebTiledLayer",
          "esri/layers/GraphicsLayer", "esri/geometry/Point"
        ], {
          css: true
        })
        .then(([Map, TileInfo, WebTiledLayer, GraphicsLayer, Point]) => {

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
            zoom: 11,
            maxZoom: 21,
            spatialReference: {
              wkid: 4326
            },
            logo: false
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
          markerLayer = new GraphicsLayer();
          map.addLayers([layera, layerb, markerLayer]);
          self.point = new Point({
            x: 120.045,
            y: 30.554,
            spatialReference: {
              wkid: 4326
            }
          });
          map.centerAt(self.point);
          self.addCoverage();
        })

        .catch(err => {
          console.error(err);
        });
    },
    //添加图层
    addCoverage() {
      let self = this;
      loadModules(["esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISDynamicMapServiceLayer",
          "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters",
        ], {
          css: true
        })
        .then(([ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, IdentifyTask, IdentifyParameters]) => {

          borderLayer = new ArcGISDynamicMapServiceLayer(self.borderUrl, {
            id: "borderUrl"
          });
          // map.addLayer(borderLayer);
          bgLayer = new ArcGISTiledMapServiceLayer(self.bgLayerUrl, {
            id: "bgLayer"
          });
          // fLayer = new ArcGISDynamicMapServiceLayer(self.fLayerUrl, {
          //   id: "fLayer"
          // });
          let layerMap = [bgLayer, borderLayer];
          map.addLayers(layerMap)
          map.setLevel(9);
          map.centerAt(self.point);
        })
    },
    tabChange(num) {
      this.tabIndex = num;
      if (num == 1) {
        this.tableTitle = '德清县土地资源承载力状态';
        this.tableTitle2 = '';
        this.reaData = tdzy;
      } else {
        this.tableTitle = '德清县水环境资源承载力状态';
        this.tableTitle2 = '德清县生态环境资源承载力状态';
        this.reaData = sst;
      }
      this.$nextTick(() => {
        this.initCommon();
      })
    },
    backIndex() {
      this.$router.push({
        path: '/home'
      })
    },
    initCommon() {
      let barChart1 = this.$echarts.init(document.querySelector(".bar1"));
      let barChart2 = this.$echarts.init(document.querySelector(".bar2"));
      let barChart3 = this.$echarts.init(document.querySelector(".bar3"));
      let barChart4 = this.$echarts.init(document.querySelector(".bar4"));
      let barX1 = [],
        barY1 = [],
        barX2 = [],
        barY2 = [],
        barX3 = [],
        barY3 = [],
        barX4 = [],
        barY4 = [],
        barX5 = [],
        barY5 = [],
        barX6 = [],
        barY6 = [];
      if (this.reaData.line1.length > 0) {
        for (let i = 0; i < this.reaData.line1.length; i++) {
          barX1.push(this.reaData.line1[i]['name']);
          barY1.push(this.reaData.line1[i]['number']);
        }
      }
      if (this.reaData.line2.length > 0) {
        for (let i = 0; i < this.reaData.line2.length; i++) {
          barX2.push(this.reaData.line2[i]['name']);
          barY2.push(this.reaData.line2[i]['number']);
        }
      }
      if (this.reaData.line3.length > 0) {
        for (let i = 0; i < this.reaData.line3.length; i++) {
          barX3.push(this.reaData.line3[i]['name']);
          barY3.push(this.reaData.line3[i]['number']);
        }
      }
      if (this.reaData.line4.length > 0) {
        for (let i = 0; i < this.reaData.line4.length; i++) {
          barX4.push(this.reaData.line4[i]['name']);
          barY4.push(this.reaData.line4[i]['number']);
        }
      }
      if (this.tabIndex == 1) {
        barChart1.setOption(
          setBarOption('现状建设用地布局匹配度', '#4470F3', barX1, barY1)
        );
        barChart2.setOption(
          setBarOption('人均耕地生产能力', '#4470F3', barX2, barY2)
        );
        barChart3.setOption(
          setBarOption('建设用地现状开发程度', '#43C8F3', barX3, barY3)
        );
        barChart4.setOption(
          setBarOption('耕地开发利用程度', '#43C8F3', barX4, barY4)
        );
        let div = document.querySelector(".table1 > div");
        if (div) {
          div.style.display = 'none'
        }
        let div2 = document.querySelector(".table4 > div");
        if (div2) {
          div2.style.display = 'none'
        }
      } else if (this.tabIndex == 2) {
        let barChart5 = this.$echarts.init(document.querySelector(".bar5"));
        if (this.reaData.line5.length > 0) {
          for (let i = 0; i < this.reaData.line5.length; i++) {
            barX5.push(this.reaData.line5[i]['name']);
            barY5.push(this.reaData.line5[i]['number']);
          }
        }
        let barChart6 = this.$echarts.init(document.querySelector(".bar6"));
        if (this.reaData.line6.length > 0) {
          for (let i = 0; i < this.reaData.line6.length; i++) {
            barX6.push(this.reaData.line6[i]['name']);
            barY6.push(this.reaData.line6[i]['number']);
          }
        }
        barChart1.setOption(
          setBarOption('水土资源匹配指数', '#4470F3', barX1, barY1)
        );
        barChart2.setOption(
          setBarOption('水资源承载指数', '#4470F3', barX2, barY2)
        );
        barChart3.setOption(
          setBarOption('土地胁迫指数', '#43C8F3', barX3, barY3)
        );
        barChart4.setOption(
          setBarOption('生境质量指数', '#43C8F3', barX4, barY4)
        );
        barChart5.setOption(
          setBarOption('污染负荷指数', '#43F3DC', barX5, barY5)
        );
        barChart6.setOption(
          setBarOption('植被覆盖指数', '#43F3DC', barX6, barY6)
        );
        let div = document.querySelector(".bar5 > div");
        let div2 = document.querySelector(".bar6 > div");
        if (div) {
          div.style.display = 'block'
        }
        if (div2) {
          div2.style.display = 'block'
        }
        window.onresize = function () {
          barChart5.resize();
          barChart6.resize();
        }
      }
      window.onresize = function () {
        barChart1.resize();
        barChart2.resize();
        barChart3.resize();
        barChart4.resize();
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
