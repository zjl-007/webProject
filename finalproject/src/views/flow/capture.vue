<template>
  <div style="height: 100%">
    <div class="formdata">
      <h3>参数设置</h3>
      <el-form ref="form" :model="formData" label-width="100px">
        <el-form-item label="网卡id" prop="id" class="standard-one">
          <el-select
            style="width: 90px"
            filterable
            allow-create
            v-model.number="formData.id"
            @change="changeNetId"
            size="small"
            default-first-option>
            <el-option
              v-for="item in devicesIdList"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抓包数量" prop="total" class="standard-one">
          <el-select
            style="width: 90px"
            filterable
            allow-create
            v-model.number="formData.total"
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
        <el-form-item label="协议类型" prop="protocol" class="standard-one">
          <el-select
            style="width: 90px"
            filterable
            allow-create
            v-model.number="formData.protocol"
            size="small"
            default-first-option>
            <el-option
              v-for="item in protocolList"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义条件" prop="customContent" class="standard-one">
          <el-input style="width: 400px"  size="small"
            placeholder="请输入内容"
            v-model="formData.customContent"
            clearable>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="control">
      <el-button size="mini" type="primary" @click="start" :disabled="isCaptureing">开始</el-button>
      <el-button size="mini" type="primary" @click="stopCapture" :disabled="!isCaptureing">停止</el-button>
      <el-button size="mini" type="primary" @click="getCapture" :disabled="isCaptureing">获取</el-button>
      <el-button size="mini" type="primary" @click="saveData" :disabled="isCaptureing">保存</el-button>
    </div>
    <el-table 
      size="small" 
      max-height="470"
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
      border style="width: 100%" :fit="true">
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
      <el-table-column prop="TargetPort" label="目标端口" width="80" align="center"/> 
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
let captureTimer = null;    //抓包定时器，获取结果
let checkTimer = null;      //检测是否长时间未抓到包
import { startCapture, stopCapture, getCapture, toSaveData, getCaptureState } from "../../api/flow/capture";
import { protocolList } from "../../state/state"
import { getDevices } from "../../api/flow/capture";
import {store} from "../../store/store"
export default {
  name: "Capture",
  data() {
    return {
      Rows: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      formData: {
        total: 5,
        protocol: 'ip',
        id: '0',
      },
      isCaptureing: false,
      devicesIdList: 0,
      protocolList: protocolList,
      options: [
        {
          label: '5', value: 5,
        },
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
  created() {
    this.formData.id = this.$route?.params?.id || 0;
    this.getCaptureState();   //获取抓包状态
    this.getCapture(); //获取历史抓包
    let devices = store.getDevices();
    if(!devices.length) {
      this.getDevices();
    } else {
      this.devicesIdList = devices.map(item => Number(item.id));
    }
  },
  beforeDestroy() {
    if(this.isCaptureing){
      this.$confirm('切换页面将会停止抓包,是否开启后台抓包?', '警告', {
        confirmButtonText: '切换页面开启后台',
        cancelButtonText: '切换页面不开启后台',
        type: 'warning'
      }).then(() => {
        return;
      }).catch(() => {
        clearInterval(captureTimer);
        clearTimeout(checkTimer);
        this.stopCapture();
      })
    }
  },
  methods: {
    async getCaptureState() {
      try {
        let { code, captureState, message } = await getCaptureState();
        if(+code != 200) {
          this.$message.error(message);
          return;
        }
        this.isCaptureing = captureState;
        if(this.isCaptureing == true) {
          captureTimer = setInterval(() => {
            this.getCapture();
          }, 500);
        }
      } catch (error) {
        this.$message.error('获取抓包状态失败！');
      }
    },
    changeNetId(val) {
      if(!this.isCaptureing) {
        return;
      }
      clearTimeout(checkTimer);
      this.$confirm('切换网卡id将停止抓包,是否切换?', '提示', {
        confirmButtonText: '继续切换',
        cancelButtonText: '取消切换',
        type: 'warning'
      }).then(() => {
        this.formData.id = val;
        this.isCaptureing = false;
        clearInterval(captureTimer);
      }).catch(() => {
        return;
      })
    },
    async getDevices() {
      try {
        const { code, devices, message } = await getDevices();
        if (+code != 200) {
          this.$message({
            type: "warning",
            message,
          });
          return;
        }
        this.devicesIdList = devices.map(item => item.id);
        let devicesList = [];
        devices.forEach((item) => {
          let {address: addressV6} = {...item.addresses[0]};
          devicesList.push({ ...item, ...item.addresses[item.addresses.length - 1], addressV6 });
        });
        store.setDevices(devicesList);
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(nS) { 
      return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');   
    },
    async startCapture() {
      try {
        let params = {...this.formData}
        let {code, message } = await startCapture(params);
        if(+code != 200) {
          return this.$message({type: 'warning', message})
        }
        this.isCaptureing = true;
        this.tableData = []
        this.$message({type: "success",message});
        captureTimer = setInterval(() => {
          this.getCapture();
        }, 500);
        checkTimer = setTimeout(() => {
          if(!this.tableData.length) {
            this.$confirm('若长时间未抓取到数据，请检查查询参数是否正确！', '提示', {
              confirmButtonText: '继续抓取',
              cancelButtonText: '取消抓取',
              closeOnClickModal: false,
              type: 'warning'
            }).then(() => {
            }).catch(() => {
              clearInterval(captureTimer);
              clearTimeout(checkTimer);
              this.isCaptureing = false;
            })
          }
        }, 10000)
      } catch (error) {
        this.$message.error(error);
        clearInterval(captureTimer);
        clearTimeout(checkTimer);
      }
    },
    async start() {
      if(this.tableData.length) {
        this.$confirm('将删除上次捕捉的数据,是否继续?否则请保存', '提示', {
          confirmButtonText: '继续',
          type: 'warning'
        }).then(() => {
          this.startCapture();
        })
        return;
      }
      this.startCapture();
    },
    async stopCapture() {
      try {
        const res = await stopCapture();
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        clearInterval(captureTimer);
        clearTimeout(checkTimer);
        this.isCaptureing = false;
      }
    },
    async getCapture() {
      try {
        let { message, code , data } = await getCapture();
        if(+code !== 200) {
          clearInterval(captureTimer);
          clearTimeout(checkTimer);
          this.stopCapture();
          this.$message({type: 'warning', message: message});
          return;
        }
        this.tableData = data;
      } catch (error) {
        this.$message.error("系统错误，错误信息："+error);
        clearInterval(captureTimer);
        this.stopCapture();
      } finally {
        if(this.tableData.length == this.formData.total) {
          clearInterval(captureTimer);
          clearTimeout(checkTimer);
          this.isCaptureing = false;
        }
      }
    },
    async saveData() {
      let idusers = window.sessionStorage.getItem('id');
      try {
        let { message, code , data } = await toSaveData({id: idusers});
        if(+code !== 200) {
          this.$message({type: 'warning', message: message});
          return;
        }
        this.$message({type: 'success', message: message});
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

<style lang="less" scoped>
.standard-one {
  display: inline-block
}
.control {
  padding-bottom: 10px;
}
</style>