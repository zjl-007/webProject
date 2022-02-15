<template>
  <div class="content">
    <!-- <div class="leftChart" :style="{ width: '1000px', height: '300px' }"></div> -->
    <div class="pieChart" :style="{ width: '1000px', height: '600px' }"></div>
  </div>
</template>
<script>
let pieChart = null;
import { getCapture } from "../../api/flow/capture";
import {eventBus, deepClone} from "../../util/util.js";
function sortCountCaptureIp(list = []) {
  let obj = {};
  list.forEach(item => {
    if(obj[`${item.TargetIp}`]) {
      // obj[`${item.TargetIp}`].count++;
      obj[`${item.TargetIp}`].value++;
    } else {
      obj[`${item.TargetIp}`] = {};
      obj[`${item.TargetIp}`].value = 1;
      // obj[`${item.TargetIp}`].ip = `${item.TargetIp}`;
      obj[`${item.TargetIp}`].name = `${item.TargetIp}`;
    }
  })
  let result = [];
  Object.keys(obj).forEach(item => {
    result.push(obj[item]);
  })
  // if(result.length > 10) {
  //   result = result.slice(0, 10); 
  // }
  return result.sort(function(a, b) {
    return b.value - a.value;
  })
}
export default {
  data() {
    return {
      captureData: null,
      sortIpData: [],
    }
  },
  mounted() {
    // this.setChart();
    // this.setPieChart();
    eventBus.$on('eventPieChart', (data) => {
      // this.captureData = deepClone(data);
      this.sortIpData = sortCountCaptureIp(data);
      this.setPieChart();
      // console.log(this.sortIpData);
    })
    // eventBus.$on('setChartData', (data) => {
    //   this.captureData = deepClone(data);
    //   this.sortIpData = sortCountCaptureIp(data);
    // });
  },
  methods: {
    setChart() {
      var myChart = this.$echarts.init(
        document.getElementsByClassName("leftChart")[0]
      );
      let data = [];
      let now = new Date();
      let value = Math.random() * 1000;
      function randomData() {
        now = new Date(+now + 1000);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth(), now.getDate()].join("/"),
            Math.round(value),
          ],
        };
      }
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }
      var option;

      option = {
        title: {
          text: "Dynamic Data & Time Axis",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            // debugger
            return (
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds() +
              " : " +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false,
          },
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            name: "Fake Data",
            type: "line",
            showSymbol: false,
            data: data,
          },
        ],
      };
      option && myChart.setOption(option);
      setInterval(function () {
        for (var i = 0; i < 10; i++) {
          data.shift();
          data.push(randomData());
        }
        myChart.setOption({
          series: [
            {
              data: data,
            },
          ],
        });
      }, 1000);
    },
    setPieChart() {
      if(!pieChart) {
        pieChart = this.$echarts.init(
        document.getElementsByClassName("pieChart")[0]
      );
      }
      // let pieChart = this.$echarts.init(
      //   document.getElementsByClassName("pieChart")[0]
      // );
      var option;

      option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            // data: [
            //   { value: 40, name: "rose 1" },
            //   { value: 38, name: "rose 2" },
            //   { value: 32, name: "rose 3" },
            //   { value: 30, name: "rose 4" },
            //   { value: 28, name: "rose 5" },
            //   { value: 26, name: "rose 6" },
            //   { value: 22, name: "rose 7" },
            //   { value: 18, name: "rose 8" },
            //   { value: 40, name: "rose 9" },
            // ],
            data: this.sortIpData,
          },
        ],
      };
      option && pieChart.setOption(option); 
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  // display: flex;
  // align-items: center;
  // justify-self: center;
  // flex-direction: column;
  height: 90%;
  overflow: auto;
}
</style>