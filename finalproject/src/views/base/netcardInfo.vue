<template>
  <div>
    <el-table :data="tableData" border size="small" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column
        prop="name"
        label="设备序列号"
        align="center"
        width="180"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="address" label="地址" width="130" align="center" />
      <el-table-column prop="subnet" label="掩码" width="130" align="center" />
      <el-table-column prop="broadcast" label="广播地址" width="130" align="center" />
      <el-table-column prop="netcd_mac" label="mac地址" align="center"/>
      <el-table-column prop="addressV6" label="地址" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="description" label="描述" align="center" :show-overflow-tooltip="true"/>
      <el-table-column prop="datalink_description" label="网络类型" align="center"/>
    </el-table>
  </div>
</template>

<script>
import { getDevices } from "../../api/flow/capture";
export default {
  name: "Capture",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getDevices();
  },
  methods: {
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
        devices.forEach((item) => {
          let {address: addressV6} = {...item?.addresses[0]};
          this.tableData.push({ ...item, ...item?.addresses[1], addressV6 });
        });

        console.log(this.tableData);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>