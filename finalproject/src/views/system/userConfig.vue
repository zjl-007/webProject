<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="username" label="姓名" width="180" />
    <el-table-column prop="telphone" label="电话" width="180" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="role" label="角色" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{
          !scope.row.role ? "系统管理员" : "系统用户"
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="role" label="用户状态" align="center">
      <template slot-scope="{ row }">
        <el-switch
          @change="changeStatus(row.status)"
          v-model="row.status"
          active-color="#13ce66"
          inactive-color="#dbdfe6"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="role" label="操作" align="center">
      <template slot-scope="scope">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { queryUserList } from "../../api/sys/userControl";
export default {
  name: "UserConfig",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      try {
        const { userList, code } = await queryUserList();
        if (+code !== 200) {
          this.$message({
            type: "warning",
            message: message || "获取用户列表失败",
          });
          return;
        }
        this.tableData = userList;
        console.log(this.tableData);
      } catch (e) {
        this.$message({
          type: "warning",
          message: e || "获取用户列表失败",
        });
      }
    },
    changeStatus(p) {
      // console.log(p);
    },
  },
};
</script>