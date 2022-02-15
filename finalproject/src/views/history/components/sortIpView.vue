<template>
<div>
  <div class="pieChart" :style="{ width: '1000px', height: '600px' }"></div>
</div>
</template>

<script>
import { store } from "../../../store/store"
export default {
  name: "sortIP",
  data() {
    return {
      store: store,
      chartData: {},
      pieChartDataLen: 0,
      input: ''
    }
  },
  mounted() {
    this.chartData = this.store.getChartData();
    this.$nextTick(() => {this.setPieChart();})
    this.pieChartDataLen = +((this.chartData?.pieChartData?.length || 1 / 10).toFixed(0))
  },
  methods: {
    setPieChart() {
      let pieChart = this.$echarts.init(
        document.getElementsByClassName("pieChart")[0]
      );
      var option;
      option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "统计值",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.chartData?.pieChartData?.slice(0, 10) || [],
          },
        ],
      };
      option && pieChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
</style>