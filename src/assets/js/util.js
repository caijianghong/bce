// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";

export function setBarOption(title, color, x, y) {
  let obj = {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Microsoft YaHei',
        fontStyle: 'normal',
        fontWeight: 'normal',
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      data: x,
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 40,
        textStyle: {
          color: '#fff'
        }
      },
      splitLine: { //网格线
        "show": false
      }
    }],
    yAxis: [{
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#fff'
        }
      },
      splitLine: { //网格线
        "show": false
      }
    }],
    series: [{
      type: 'bar',
      barWidth: '60%',
      data: y,
      itemStyle: {
        normal: {
          color: color
        }
      }
    }]
  }
  return obj;
}

export function setHomeBarOption(title, x, y, boolean) {
  let obj = {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Microsoft YaHei',
        fontStyle: 'normal',
        fontWeight: 'normal',
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        var result = "";
        var type = "";
        params.forEach(function (item) {
          if (boolean) {
            let str = '';
            if (item.value == 1) {
              str = 1;
            } else if (item.value == 0.5) {
              str = 0;
            } else {
              str = -1;
            }
            type = `<b>${item.data.type}：</b> ${str}`
          } else {
            if (item.data.type) {
              type = `<b>${item.data.type}：</b> ${item.value}`
            } else {
              type = `${item.value}`;
            }
          }
          result += `${item.name} <br/>${type}`
        })
        return result
      }
    },
    grid: {
      left: boolean ? '10%' : '5%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [{
      type: 'category',
      data: x,
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        interval: 0,
        rotate: 40,
        textStyle: {
          color: '#fff'
        }
      },
      splitLine: { //网格线
        "show": false
      },
    }],
    yAxis: [{
      type: 'value',
      // show: !boolean,
      axisLabel: {
        show: !boolean,
        textStyle: {
          color: '#fff'
        }
      },
      splitLine: { //网格线
        "show": false
      },
    }],
    series: [{
      type: 'bar',
      barWidth: '60%',
      data: y,
      itemStyle: {
        normal: {
          color: function (params) {
            let newV = params.data.type;
            var colorList = ['#3C90F7', '#55BFC0', '#5EBE67'];
            switch (newV) {
              case '超载':
                return colorList[0]
                break;
              case '临界':
                return colorList[1]
                break;
              case '可载':
                return colorList[2]
                break;
              default:
                return colorList[2]
                break;
            }
          }
        }
      }
    }]
  }

  return obj;
}

export function setPieOption(x, y) {
  let obj = {
    tooltip: { //鼠标悬浮弹窗提示
      trigger: 'item',
      show: true,
      showDelay: 0,
      hideDelay: 0,
      transitionDuration: 0,
      backgroundColor: 'rgba(50, 50, 50, 0.7)',
      padding: 10,
      formatter: '{b} : {c}个 ({d}%)'
    },
    // legend: {
    //   orient: 'vertical',
    //   right: 10,
    //   top: '30%',
    //   data: x,
    //   textStyle: {
    //     fontSize: 12, 
    //     color: '#fff'
    //   },
    // },
    series: [{
      type: 'pie',
      radius: '60%',
      center: ['50%', '50%'],
      data: y,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      // 设置值域的那指向线
      labelLine: {
        normal: {
          show: false // show设置线是否显示，默认为true，可选值：true ¦ false
        }
      },
      // 设置值域的标签
      label: {
        normal: {
          position: 'outer',
          formatter: ''
        }
      },
      itemStyle: {
        normal: {
          color: function (params) {
            var colorList = ['#3C90F7', '#55BFC0', '#5EBE67'];
            return colorList[params.dataIndex]
          }
        }
      }
    }]
  }
  return obj;
}

export function exportEXCEL(title, name) {
  let saveName = title + '.xlsx';
  /* 从表生成工作簿对象 */
  var wb = XLSX.utils.table_to_book(document.querySelector(name));
  /* 获取二进制字符串作为输出 */
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], {
        type: "application/octet-stream"
      }),
      //设置导出文件名称
      saveName
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  return wbout;
}

export function completeTown(arr, type) { //村列表添加镇字段
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].hasOwnProperty(type)) {
      arr[i][type] = arr[i - 1][type]
    }
  }
}

export function getFixedArr(arr, name, number, boolean) { //两列
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = {};
    obj['name'] = arr[i][name];
    if (boolean) { //是类型不是数字
      obj['type'] = arr[i][number];
    } else {
      obj['number'] = mathNum(arr[i][number], 3)
    }
    newArr.push(obj);
  }
  return newArr;
}

export function getThirdArr(arr, name, number, type) { //三列
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = {};
    obj['name'] = arr[i][name];
    obj['type'] = arr[i][type];
    obj['number'] = mathNum(arr[i][number], 3);
    newArr.push(obj);
  }
  return newArr;
}

export function checkLand(type, type2) { //判断土地状态
  let str = "";
  if (type == '可载') {
    if (type2 == '可载') {
      str = "可载";
    } else if (type2 == '临界') {
      str = "临界";
    }
    if (type2 == '超载') {
      str = "超载";
    }
  } else if (type == '临界') {
    if (type2 == '可载') {
      str = "临界";
    } else {
      str = "超载";
    }
  } else {
    str = "超载";
  }
  return str;
}

export function checkWater(type1, type2) { //判断水资源状态
  let type = 0.6 * type1 + 0.4 * type2;
  let str = '';
  if (type >= 0.4) {
    str = '可载';
  } else if (type >= 0.25) {
    str = '临界';
  } else {
    str = '超载';
  }
  return str;
}

export function checkSthj(type1, type2, type3, type4) { //判断生态资源状态
  let type = 0.3 * type1 + 0.25 * type2 + 0.25 * (1 - type3) + 0.2 * (1 - type4);
  let str = '';
  if (type >= 0.5) {
    str = '可载';
  } else if (type >= 0.35) {
    str = '临界';
  } else {
    str = '超载';
  }
  return str;
}

export function checkAll(type1, type2, type3) { //判断土地水与生态总的状态
  let str = '';
  if (type1 == '超载') {
    str = '超载';
  } else if (type1 == '临界') {
    if (type2 == '临界' && type3 == '临界') {
      str = '超载';
    } else if (type2 == '超载' || type3 == '超载') {
      str = '超载';
    } else if ((type2 == '临界' && type3 == '可载') || (type3 == '临界' && type2 == '可载')) {
      str = '临界';
    } else {
      str = '可载';
    }
  } else {
    if (type2 == '超载' && type3 == '超载') {
      str = '超载';
    } else if (type2 == '临界' && type3 == '临界') {
      str = '临界';
    } else if ((type2 == '超载' && type3 != '超载') || (type3 == '超载' && type2 != '超载')) {
      str = '临界';
    } else {
      str = '可载';
    }
  }
  return str;
}

function checkYujing(type) { //判断预警状态
  let str = '';
  if (type == '超载') {
    str = -1;
  } else if (type == '临界') {
    str = 0;
  } else {
    str = 1;
  }
  return str;
}

function yujingRes(arry) { //判断预警走势
  let str = '';
  if (getTypeNum(arry, 1) == 4) {
    str = '无警';
  } else if (getTypeNum(arry, -1) >= 1 || getTypeNum(arry, 0) == 4) {
    str = '重警';
  } else if (getTypeNum(arry, 1) == 1 && getTypeNum(arry, 0) == 3) {
    str = '重警';
  } else {
    str = '轻警';
  }
  return str;
}

export function yujingList(obj) { //获取预警数据list
  let arr = [],
    arr1 = obj.quarter1th.zonghe,
    arr2 = obj.quarter2th.zonghe,
    arr3 = obj.quarter3th.zonghe,
    arr4 = obj.quarter4th.zonghe;
  for (let i in arr1) {
    let newObj = {};
    newObj['name'] = arr1[i]['name'];
    newObj['first'] = checkYujing(arr1[i]['result']);
    for (let j in arr2) {
      if (arr1[i]['name'] == arr2[j]['name']) {
        newObj['second'] = checkYujing(arr2[j]['result']);
      }
    }
    for (let k in arr3) {
      if (arr1[i]['name'] == arr3[k]['name']) {
        newObj['third'] = checkYujing(arr3[k]['result']);
      }
    }
    for (let n in arr4) {
      if (arr1[i]['name'] == arr4[n]['name']) {
        newObj['forth'] = checkYujing(arr4[n]['result']);
      }
    }
    arr.push(newObj);
  }
  for (let i in arr) {
    arr[i]['status'] = yujingRes([arr[i]['first'], arr[i]['second'], arr[i]['third'], arr[i]['forth']]);
  }
  return arr;
}

export function sum(arr, type) { //求某一列的和
  let res = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    res += arr[i][type]
  }
  return mathNum(res, 2)
}

export function filterCunArr(name, arry) { // 获取对应镇的所有村的list
  let arr = [];
  for (let i in arry) {
    if (name == arry[i]['镇名']) {
      arr.push(arry[i])
    }
  }
  return arr;
}

export function filterSum(arrObj, arr2, type) { //求符合条件的某一列的和
  let arr = [],
    res;
  for (let j in arr2) {
    if (arrObj['镇名'] == arr2[j]['镇名']) {
      arr.push(arr2[j][type])
    }
  }
  res = eval(arr.join('+'));
  return mathNum(res, 2);
}

export function mathNum(value, number) { //精确几位小数
  let num = Math.pow(10, number);
  return Math.round(value * num) / num;
}

export function removeKeyEmputyStr(arr) { //去除数组key的空字符串
  let newArr = [];
  for (var i in arr) {
    let newObj = {};
    for (var j in Object.keys(arr[i])) {
      newObj[Object.keys(arr[i])[j].replace(/\s*/g, "")] = Object.values(arr[i])[j]
    }
    newArr.push(newObj);
  }
  return newArr
}

function getTypeNum(arry, ele, type) { //获取所有元素的个数
  let newArr = [];
  for (let i in arry) {
    if (type) {
      newArr.push(arry[i][type]);
    } else {
      newArr.push(arry[i]);
    }
  }
  var temp = [];
  for (let index = 0; index < newArr.length; index++) {
    if (newArr[index] == ele) {
      temp.push(true);
    }
  }
  return temp.length;
}

export function getTownList(arry, type) {
  return [{
    type: '超载',
    number: getTypeNum(arry, "超载", type)
  }, {
    type: '临界',
    number: getTypeNum(arry, "临界", type)
  }, {
    type: '可载',
    number: getTypeNum(arry, "可载", type)
  }]
}