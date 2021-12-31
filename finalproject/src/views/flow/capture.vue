<template>
  <div style="height: 100%">
    <div class="formdata">
      <el-form ref="form" :model="formdata" label-width="80px">
        <el-form-item label="抓包数量" prop="total">
          <el-select
            style="width: 90px"
            filterable
            allow-create
            v-model="formdata.total"
            size="small"
            default-first-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="control">
      <el-button size="mini" @click="startCapture">开始</el-button>
      <el-button size="mini" @click="stopCapture">停止</el-button>
      <el-button size="mini" @click="getCapture">获取</el-button>
      <el-button size="mini" @click="saveData">保存</el-button>
    </div>
    <el-table 
      size="small" 
      max-height="470"
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
      border style="width: 100%" :fit="true">
      <el-table-column type="selection" width="55" align="center"/> 
      <el-table-column prop="Caplen" label="数据长度" width="80" align="center"/>
      <el-table-column prop="ContractType" label="协议类型" :sortable="true" width="100" align="center"/>
      <el-table-column prop="SecTime" label="请求时间" align="center" :sortable="true" :showOverflowTooltip="true"> 
        <template slot-scope="{row}">
          <span>{{formatDate(row.SecTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="SourceIp" label="源IP" width="150" align="center"/>
      <el-table-column prop="SourceMacAddr" la bel="源MAC地址" width="150" align="center"/>
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
let timer = null;
import { startCapture, stopCapture, getCapture, toSaveData } from "../../api/flow/capture";
export default {
  name: "Capture",
  data() {
    return {
      Rows: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      formdata: {
        total: '',
      },
      options: [
        {
          label: '200', value: 200,
        },
        {
          label: '400', value: 400,
        },
        {
          label: '800', value: 800,
        },
        {
          label: '无限', value: -1,
        },
      ]
    };
  },
  created() {},
  beforeDestroy() {
    if(timer) {
      clearInterval(timer);
    }
  },
  methods: {
    formatDate(nS) { 
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
    },
    async startCapture() {
      try {
        let { message } = await startCapture();
        this.$message({
          type: "warning",
          message: message,
        });
      } catch (error) {
        this.$message({
          type: "warning",
          message: error,
        });
      } finally {
        // timer = setInterval(() => {
        //   this.getCapture();
        // }, 500)
      }
    },
    async stopCapture() {
      try {
        const res = await stopCapture();
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        // clearInterval(timer);
        // console.log(timer);
      }
    },
    async getCapture() {
      try {
        let { message, code , data } = await getCapture();
        this.tableData = data;
      } catch (error) {
        console.log(error);
      }
    },
    async saveData() {
      let id = window.sessionStorage.getItem('id');
      try {
        const res = await toSaveData({id});
      } catch (error) {
        console.log(error);
      }
    },
    selectRows(rows) {
      this.Rows = rows;
    },
    selectAll(all) {
      this.Rows = all;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>