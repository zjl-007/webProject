<template>
  <div class="content">
    <div class="leftChart" :style="{ width: '1000px', height: '300px' }"></div>
  </div>
</template>
<script>
import { getCapture } from "../../api/flow/capture";
export default {
  mounted() {
    this.setChart();
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
      for (var i = 0; i < 10; i++) {
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
              date.getSeconds() +
              ":" +
              (date.getMinutes()) +
              ":" +
              date.getHours() +
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
        for (var i = 0; i <  1; i++) {
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
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  align-items: center;
  justify-self: center;
  flex-direction: column;
}
</style>