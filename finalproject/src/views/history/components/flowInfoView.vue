<template>
<div>
  <div class="info">
    <span>总数据长度：{{totalCapLen}}(字节)&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span>总耗时：{{totalSecTime}}(s)&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span>平均流量：{{averageFlow.toFixed(2)}}kb/s</span>
  </div>

  <div class="table">
    <el-table 
      size="small" 
      max-height="470"
      :data="tableData" 
      border style="width: 100%" :fit="true">
      <el-table-column prop="username" label="操作人" width="80" align="center"/>
      <el-table-column prop="starttime" label="起始操作时间" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{formatDate(row.starttime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="终止操作时间" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{formatDate(row.endtime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalcaplen" label="总数据长度" width="100" align="center"/>
      <el-table-column prop="totaldatalen" label="捕获包数" width="80" align="center"/> 
      <el-table-column prop="totalsectime" label="消耗时间(s)" width="100" align="center"/> 
      <el-table-column label="平均流量" width="150" align="center">
        <template slot-scope="{row}">
          <span>{{(row.totalcaplen / 1024 / row.totalsectime).toFixed(2)}}kb/s</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="block"> -->
      <el-pagination
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="chartData.columnarData.length">
      </el-pagination>
    <!-- </div> -->
  </div>
</div>
</template>

<script>
import { store } from "../../../store/store";
export default {
  name: "sortIP",
  data() {
    return {
      tableData: [],
      chartData: {
        columnarData:[],
      },
      store: store,
      totalCapLen: 0,
      totalSecTime: 0,
      averageFlow: 0,
    };
  },
  mounted() {
    this.chartData = this.store.getChartData();
    this.pageChange(1);
  },
  methods: {
    formatDate(nS) { 
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
    },
    pageChange(val = 1) {
      this.totalCapLen = 0;
      this.totalSecTime = 0;
      this.tableData = this.chartData.columnarData.slice((val-1)*10, val*10);
      this.chartData?.columnarData.forEach(item => {
        this.totalCapLen += +item.totalcaplen;
        this.totalSecTime += +item.totalsectime;
      })
      this.averageFlow = this.totalCapLen / 1024 / this.totalSecTime
    },
  },
};
</script>

<style lang="less" scoped>
.table {
  padding: 10px;
}
</style>