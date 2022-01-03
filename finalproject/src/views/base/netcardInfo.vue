<template>
  <div>
    <el-button type="primary" size="small" @click="getDevices">刷新列表</el-button>
    <el-table :data="tableData" border size="small" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column prop="id" label="ID" width="50" align="center" />
      <el-table-column
        prop="name"
        label="设备序列号"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="address" label="IPv4地址" width="130" align="center">
        <template slot-scope="{row}">
          <span v-if="row.address != row.addressV6">{{ row.address }}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="subnet" label="子网掩码" width="130" align="center" />
      <el-table-column prop="broadcast" label="广播地址" width="130" align="center" />
      <el-table-column prop="netcd_mac" label="MAC地址" align="center"/>
      <el-table-column prop="addressV6" label="IPv6地址" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="description" label="描述" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="datalink_description" label="网卡类型" align="center"/>
      <el-table-column prop="role" label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="goToCapture(row)">开始抓包</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDevices } from "../../api/flow/capture";
import { store } from "../../store/store"
export default {
  name: "Capture",
  data() {
    return {
      tableData: [],
      store: store,
      loading: true,
    };
  },
  created() {
    let devices = store.getDevices();
    if(!devices.length) {
      this.getDevices();
    } else {
      this.tableData = devices;
      this.loading = false;
    }
  },
  methods: {
    async getDevices() {
      this.loading = true;
      this.tableData = [];
      try {
        const { code, devices, message } = await getDevices();
        if (+code != 200) {
          this.$message({
            type: "warning",
            message,
          });
          return;
        }
        devices.forEach((item) => {
          let {address: addressV6} = {...item.addresses[0]};
          this.tableData.push({ ...item, ...item.addresses[item.addresses.length - 1], addressV6 });
        });
        this.store.setDevices(this.tableData);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    goToCapture(row) {
      this.$router.push({name: 'capture', params: row});
    }
  },
};
</script>