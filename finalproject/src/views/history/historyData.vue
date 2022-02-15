<template>
  <div style="height: 100%" class="main">
    <div class="control">
      <div style="margin-bottom: 15px">
        <el-button size="mini" type="primary" @click="initData">刷新表格</el-button>
        <el-button size="mini" type="primary" @click="delUserData">删除用户所有数据</el-button>
        <el-button size="mini" type="primary" @click="delAllUserData" v-if="currentId == 110">删除所有历史数据</el-button>
      </div>
      <div>
        <h4>筛选栏参数</h4>
        <el-select v-if="isAdmin" size="mini" v-model="searchData.idusers" filterable placeholder="请选择对象" clearable>
          <el-option
            v-for="item in userList"
            :key="item.username"
            :label="item.username"
            :value="item.idusers">
          </el-option>
        </el-select>
        <span>
          协议
          <el-select size="mini" v-model="searchData.ContractType" filterable placeholder="请选择">
            <el-option
              v-for="item in protocolList"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
        </span>
        
        源IP
        <el-input size="mini" v-model="searchData.SourceIp" style="width: 145px;" clearable></el-input>
        目标IP
        <el-input size="mini" v-model="searchData.TargetIp" style="width: 145px;" clearable></el-input>
        源端口
        <el-input size="mini" v-model="searchData.SourcePort" placeholder="请输入" style="width: 80px" clearable></el-input>
        目标端口
        <el-input size="mini" v-model="searchData.TargetPort" placeholder="请输入" style="width: 80px" clearable></el-input>
        <el-date-picker
        style="margin-left: 10px"
          size="mini"
          v-model="time"
          type="datetimerange"
          value-format='timestamp'
          range-separator="至"
          start-placeholder="开始采集时间"
          end-placeholder="结束采集时间">
        </el-date-picker>
      </div>
      <div class="control-btn">
        <el-button size="mini" type="primary" @click="initData">搜索</el-button>
        <el-button size="mini" type="primary" @click="refreshData">重置</el-button>
        <el-button @click="showChart = !showChart" type="primary" size="mini" style="margin-left: 10px;">查看图表</el-button>
      </div>
    </div>
    <el-table 
      size="small" 
      max-height="470" @select="selectRows" @select-all="selectAll"
      :data="tableData" 
      border style="width: 100%" :fit="true">
      <el-table-column type="selection" width="55" align="center"/> 
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column prop="username" label="归属用户" width="80" align="center"/>
      <el-table-column prop="Caplen" label="数据长度" width="80" align="center"/>
      <el-table-column prop="ContractType" label="协议类型" :sortable="true" width="100" align="center"/>
      <el-table-column prop="SecTime" label="请求时间" align="center" width="150" :sortable="true" :showOverflowTooltip="true"> 
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
        :current-page="pageParams.currentPageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageParams.pageSize"
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParams.total">
      </el-pagination>
    </div>
    <transition name="slide-fade">
      <div class="example" v-if="showChart">
        <div class="header">
          <el-button size="small" type="primary"  @click="showChart = !showChart">关闭</el-button>
        </div>
        <history-chart></history-chart>
      </div>
    </transition>
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
import { protocolList } from "../../state/state" 
import historyChart from "./historyChart.vue"
import { store } from "../../store/store"
import { getUserChartHistory } from "../../api/history/history";
export default {
  name: "HistoryData",
  components: { historyChart },
  data() {
    return {
      store: store,
      tableData: [],
      showChart: false,
      Rows: [],
      userList: [],
      searchData: {
        idusers: '',
        ContractType: '',
        startTime: '',
        endTime: '',
        SourcePort: '',
        TargetPort: '',
        SourceIp:'',
        TargetIp: '',
      },
      time: '',
      isAdmin: false,
      currentId: window.sessionStorage.getItem("id"),
      protocolList: protocolList.slice(1, protocolList.length),
      pageParams: {
        pageSize: 10,
        total: 0,
        currentPageNum: 1,
      }
    };
  },
  created() {
    this.initData();
    this.getUserList();
    if(window.sessionStorage.getItem('id') == 110) this.isAdmin = true;
  },
  methods: {
    async getHistoryData() {
      try {
        let { code, message, data } = await getUserChartHistory();
        if (+code != 200) return this.$message.error(message || "获取数据失败");
        this.store.setChartData(data);
      } catch (error) {
        this.$message.error("系统错误，请稍后再试！" + error || "");
      }
    },
    refreshData() {
      let cacheObj = {};
      Object.keys(this.searchData).forEach(item => {
        cacheObj[item] = '';
      })
      this.time = '';
      this.searchData = cacheObj;
      console.log(this.searchData);
    },
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
      let params = {...this.searchData}
      this.showChart = false;
      // if(!params.idusers) {
      //   params.idusers = this.currentId == 110 ? '110' : this.currentId;
      // }
      if(this.time) {
        params.startTime = String(this.time[0]).slice(0, String(this.time[0]).length - 3);
        params.endTime = String(this.time[1]).slice(0, String(this.time[1]).length - 3);
      }
      params.pageParams = this.pageParams;
      try {
        let { code, message, data } = await getUserHistory(params);
        if (+code !== 200) {
          this.$message({
            type: "warning",
            message: message,
          });
          return;
        }
        this.tableData = data.list || [];
        this.pageParams = data.pageParams;
        
      } catch (error) {
        this.$message({
          type: "warning",
          message: error,
        });
      } finally {
        this.getHistoryData();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageParams.pageSize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageParams.currentPageNum = val;
      this.initData();
    },
    async delUserData() {
      if(!this.searchData.idusers) {
        return this.$message.error('请选择数据用户对象！！！')
      }
      this.$confirm("是否删除数据?", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(async() => {
        try {
          let { code, message } = await delUserHistory({id: this.searchData.idusers});
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
        let { code, message } = await delHistoryData({ids});
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
  margin-bottom: 10px;
  .el-select {
    width: 110px;
    margin-right: 10px;
  }
}
.block {
  padding-top: 10px;
}
h4 {
  margin-bottom: 15px;
}
.control-btn {
  padding-top: 10px;
}
.main {
  position: relative;
}


.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.example {
  position: absolute;
  z-index: 99;
  right: 0;
  top: 0;
  background-color: #dee1e6;
  padding: 15px;
  min-width: 500px;
  box-sizing: border-box;
  max-height: 100%;
  overflow: hidden;
  height: 100%;
  min-height: 100%; 
  border-radius: 5px;
}
</style>