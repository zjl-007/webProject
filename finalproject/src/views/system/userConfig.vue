<template>
  <div>
    <div class="head">
      <el-button @click="addUser" type="primary" size="small">添加用户</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="55" />
      <el-table-column prop="username" label="账户名称" align="center" width="100" />
      <el-table-column prop="telphone" label="电话" align="center" width="120" />
      <el-table-column prop="email" label="邮箱" align="center" width="180" />
      <el-table-column prop="role" label="角色" align="center" width="130">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            !scope.row.role ? "系统管理员" : "系统用户"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="powerlogin" label="用户状态" align="center" width="130" >
        <template slot-scope="{ row }">
          <span>{{ row.powerlogin ? '正常(可登录)' : '禁用(不可登录)'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="powercapture" label="抓包权限" align="center" width="130" >
        <template slot-scope="{ row }">
          <span>{{ row.powercapture ? '开启' : '禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="powerdb" label="数据库权限" align="center" width="130" >
        <template slot-scope="{ row }">
          <span>{{ row.powerdb ? '读写' : '仅读'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="信息权限管理" align="center" min-width="200">
        <template slot-scope="{row}" v-if="row.role != 0">
          <el-button type="primary" size="mini" @click="editUser(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="delUser(row)">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-power-and-info ref="dialog" @update="getUserList"></dialog-power-and-info>
  </div>
</template>

<script>
import { queryUserList,delUser } from "../../api/sys/userControl";
import dialogPowerAndInfo from "./dialogPowerAndInfo.vue"
export default {
  components: { dialogPowerAndInfo },
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
        const { message, userList, code } = await queryUserList();
        if (+code !== 200) {
          this.$message({
            type: "warning",
            message: message || "获取用户列表失败",
          });
          return;
        }
        this.tableData = userList;
      } catch (e) {
        this.$message({
          type: "warning",
          message: e || "获取用户列表失败",
        });
      }
    },
    editUser(row) {
      this.$refs.dialog.show(row, 'edit');
    },
    async addUser(row) {
      this.$refs.dialog.show(row, 'add');
    },
    async delUser(row) {
      try {
        let id = row.idusers;
        let {code, data, message } = await delUser({id});
        if(+code != 200) {
          return this.$message.error(message);
        }
        this.$message({type: 'success', message});
      } catch (error) {
        this.$message.error(error);
      } finally {
        this.getUserList();
      }
    }
  },
};
</script>