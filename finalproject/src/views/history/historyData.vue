<template>
  <div style="height: 100%">
    <div class="control">
      数据对象
      <el-select size="small" @change="initData" v-model="idusers" filterable placeholder="请选择">
        <el-option
          v-for="item in userList"
          :key="item.username"
          :label="item.username"
          :value="item.idusers">
        </el-option>
      </el-select>
      <el-button size="small" @click="initData">刷新表格</el-button>
      <el-button size="small" @click="delUserData">删除用户所有数据</el-button>
      <el-button size="small" @click="delAllUserData" v-if="currentId == 110">删除所有历史数据</el-button>
    </div>
    <el-table 
      size="small" 
      max-height="470" @select="selectRows" @select-all="selectAll"
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
      border style="width: 100%" :fit="true">
      <el-table-column type="selection" width="55" align="center"/> 
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column prop="username" label="归属用户" width="80" align="center"/>
      <el-table-column prop="Caplen" label="数据长度" width="80" align="center"/>
      <el-table-column prop="ContractType" label="协议类型" :sortable="true" width="100" align="center"/>
      <el-table-column prop="SecTime" label="请求时间" align="center" width="100" :sortable="true" :showOverflowTooltip="true"> 
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
      <el-button size="small" @click="delData">删除已选</el-button>
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
import {
  getUserHistory,
  delUserHistory,
  delHistoryData,
  delAllHistory,
} from "../../api/history/history";
import { queryUserList } from "../../api/sys/userControl";
export default {
  name: "HistoryData",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      Rows: [],
      userList: [],
      idusers: '',
      currentId: window.sessionStorage.getItem("id"),
    };
  },
  created() {
    this.initData();
    this.getUserList();
  },
  methods: {
    async getUserList() {
      try {
        const { message, userList, code } = await queryUserList();
        if (+code !== 200) {
          this.$message({
            type: "warning",
            message: message || "获取用户列表失败",
          });
          return;
        }
        this.userList = userList;
      } catch (e) {
        this.$message({
          type: "warning",
          message: e || "获取用户列表失败",
        });
      }
    },
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
        let { code, message, data } = await getUserHistory({ idusers: this.idusers || this.currentId });
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
      if(!this.idusers) {
        return this.$message.error('请选择数据用户对象！！！')
      }
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(async() => {
        try {
          let { code, message } = await delUserHistory({id: this.idusers});
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
    },
    async delAllUserData() {
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(async() => {
        try {
          let { code, message } = await delAllHistory({id: this.currentId});
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
    }
  },
};
</script>
<style lang="less" scoped>
.control {
  margin-bottom: 15px;
  .el-select {
    width: 110px;
    margin-right: 10px;
  }
}
.block {
  padding-top: 10px;
}
</style>