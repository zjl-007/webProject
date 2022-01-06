<template>
  <div>
    <el-dialog
      :title="dialogType == 'add' ? '新增' : '信息权限管理'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal='false'
    >
      <div class="editInfo" v-if="dialogType == 'edit'">
        <el-form ref="infoForm" :model="infoData" :rules="infoRule" label-width="100px">
          <el-form-item label="账户名称" prop="username">
            <el-input placeholder="请输入账户名称" v-model="infoData.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input placeholder="请输入密码" v-model="infoData.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="telphone">
            <el-input placeholder="请输入电话" v-model="infoData.telphone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" v-model="infoData.email"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input placeholder="请输入描述" v-model="infoData.description"></el-input>
          </el-form-item>
          <el-form-item label="登录权限" prop="powerlogin">
            <el-switch
              v-model="infoData.powerlogin"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#eee">
            </el-switch>
          </el-form-item>
          <el-form-item label="抓包权限" prop="powerlogin">
            <el-switch
              v-model="infoData.powercapture"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#eee">
            </el-switch>
          </el-form-item>
          <el-form-item label="数据库权限" prop="powerlogin">
            <el-switch
              v-model="infoData.powerdb"
              :active-value="1"
              :inactive-value="0"
              active-text="读写"
              inactive-text="仅读"
              active-color="#13ce66"
              inactive-color="#eee">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div class="editInfo" v-else>
        <el-form ref="infoForm" :model="addData" :rules="infoRule" label-width="100px">
          <el-form-item label="账户名称" prop="username">
            <el-input placeholder="请输入账户名称" v-model="addData.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input placeholder="请输入密码" v-model="addData.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="telphone">
            <el-input placeholder="请输入电话" v-model="addData.telphone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" v-model="addData.email"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input placeholder="请输入描述" v-model="addData.description"></el-input>
          </el-form-item>
          <el-form-item label="登录权限" prop="powerlogin">
            <el-switch
              v-model="addData.powerlogin"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#eee">
            </el-switch>
          </el-form-item>
          <el-form-item label="抓包权限" prop="powerlogin">
            <el-switch
              v-model="addData.powercapture"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#eee">
            </el-switch>
          </el-form-item>
          <el-form-item label="数据库权限" prop="powerlogin">
            <el-switch
              v-model="addData.powerdb"
              :active-value="1"
              :inactive-value="0"
              active-text="读写"
              inactive-text="仅读"
              active-color="#13ce66"
              inactive-color="#eee">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from "../../util/util"
import {editUserInfo, addUser} from '../../api/sys/userControl'
export default {
  name: "DialogPowerAndInfo",
  data() {
    return {
      dialogVisible: false,
      dialogType: 'edit',
      infoData: {
        username: '',
        password: '',
        telphone: '',
        email: '',
        description: '',
        powerlogin: '',
        powercapture: '',
        powerdb: '',
      },
      addData: {
        username: '',
        password: '',
        telphone: '',
        email: '',
        description: '',
        powerlogin: 1,
        powercapture: 1,
        powerdb: 1,
      },
      infoRule: {
        username: [{required: true, message: '账户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        telphone: [{required: true, message: '电话不能为空', trigger: 'blur'}],
        email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
      },
    };
  },
  created() {
  },
  methods: {
    show(row, type) {
      this.dialogType = type
      this.dialogVisible = true;
      this.infoData = deepClone(row);
    },
    ok() {
      this.$refs.infoForm.validate(async valid => {
        if(!valid) {
          this.$message.error("请检查输入项");
          return
        }
        if(this.dialogType == 'edit') {
          this.editUser();
        } else {
          this.addUser();
        }
      })
    },
    async editUser() {
      try {
        let { code, message, err} = await editUserInfo(this.infoData);
        if(+code != 200) return this.$message.error(message + err + '');
        this.$message({type: 'success', message});
        this.dialogVisible = false;
        this.$emit('update');
      } catch (error) {
        return this.$message.error("系统错误");
      } 
    },
    async addUser() {
      console.log(this.addData);
      try {
        let { code, message, err} = await addUser(this.addData);
        if(+code != 200) return this.$message.error(message);
        this.$message({type: 'success', message});
        this.dialogVisible = false;
        this.$emit('update');
      } catch (error) {
        return this.$message.error("系统错误");
      } 
    }
  },
};
</script>