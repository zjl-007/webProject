<template>
  <div style="height: 100%">
    <div class="control">
      <el-button size="small" @click="initData">刷新表格</el-button>
      <el-button size="small" @click="delData">删除已选</el-button>
      <el-button size="small" @click="delUserData">删除所有历史数据</el-button>
    </div>
    <el-table 
      size="small" 
      max-height="470" @select="selectRows" @select-all="selectAll"
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
      border style="width: 100%" :fit="true">
      <el-table-column type="selection" width="55" align="center"/> 
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column prop="Caplen" label="数据长度" width="80" align="center"/>
      <el-table-column prop="ContractType" label="协议类型" :sortable="true" width="100" align="center"/>
      <el-table-column prop="SecTime" label="请求时间" align="center" :sortable="true" :showOverflowTooltip="true"> 
        <template slot-scope="{row}">
          <span>{{formatDate(row.SecTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="SourceIp" label="源IP" width="150" align="center"/>
      <el-table-column prop="SourceMacAddr" label="源MAC地址" width="150" align="center"/>
      <el-table-column prop="SourcePort" label="源端口" width="80" align="center"/> 
      <el-table-column prop="TargetIp" label="目标IP" width="150" align="center"/>
      <el-table-column prop="TargetMacAddr" label="目标MAC地址" width="150" align="center"/>
      <el-table-column prop="Targetport" label="目标端口" width="80" align="center"/> 
    </el-table>
    <div class="block">
      <el-pagination style="display: inline-block"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
let id = window.sessionStorage.getItem("id");
import {
  getUserHistory,
  delUserHistory,
  delHistoryData,
} from "../../api/history/history";
export default {
  name: "HistoryData",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      Rows: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    selectRows(rows) {
      this.Rows = rows;
    },
    selectAll(all) {
      this.Rows = all;
    },
    formatDate(nS) { 
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
    },
    async initData() {
      try {
        let { code, message, data } = await getUserHistory({ id });
        if (+code !== 200) {
          this.$message({
            type: "warning",
            message: message,
          });
          return;
        }
        this.tableData = data;
      } catch (error) {
        this.$message({
          type: "warning",
          message: error,
        });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async delUserData() {
      let id = window.sessionStorage.getItem("id");
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(async() => {
        try {
          let { code, message } = await delUserHistory({id});
          if (+code !== 200) {
            this.$message({
              type: "warning",
              message: message,
            });
            return;
          }
          this.$message({
            type: "success",
            message: message,
          });
        } catch (error) {
          this.$message({
            type: "warning",
            message: error,
          });
        } finally {
          this.initData();
        }
      });
    },
    async delData() {
      if(!this.Rows.length) {
        this.$message({
          type: 'warning',
          message: '请选择数据！'
        })
        return;
      }
      let ids = [];
      this.Rows.forEach(item => ids.push(item.id))
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        this.delDataApi(ids)
      });
    },
    async delDataApi(ids) {
      try {
        let { code, message, data } = await delHistoryData({ids});
        if (+code !== 200) {
          this.$message({
            type: "warning",
            message: message,
          });
          return;
        }
      } catch (error) {
        this.$message({
          type: "warning",
          message: error,
        });
      } finally {
        this.initData();
      }
    }
  },
};
</script>