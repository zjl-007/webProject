<template>
  <div class="transfor">
    <div class="tabs">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="请求统计" name="sortIp"/>
        <el-tab-pane label="流量统计" name="flowInfo"/>
      </el-tabs>
    </div>
    <div class="content">
      <sort-ip-view ref="sortIpView" v-if="activeName == 'sortIp'"></sort-ip-view>
      <flow-info-view ref="flowInfoView" v-if="activeName == 'flowInfo'"></flow-info-view>
    </div>
  </div>
</template>

<script>
import sortIpView from "./components/sortIpView.vue";
import flowInfoView from './components/flowInfoView.vue';
export default {
  name: "HistoryChart",
  components: { sortIpView, flowInfoView },
  data() {
    return {
      activeName: "sortIp",
    };
  },
  mounted() {
    // this.getHistoryData();
  },
  methods: {
     /* eslint-disable */
    handleClick(tab, event) { 
      this.activeName = tab.name || "sortIp";
    },
    // async getHistoryData() {
    //   try {
    //     let { code, message, data } = await getUserChartHistory();
    //     if (+code != 200) return this.$message.error(message || "获取数据失败");
    //     this.chartData = data;
    //     this.store.setChartData(data);
    //   } catch (error) {
    //     this.$message.error("系统错误，请稍后再试！" + error || "");
    //   }
    // },
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
  width: 1020px;
  background-color: #f3f4fa;
}
.transfor {
  height: 95%;
  overflow: hidden;
}
</style>