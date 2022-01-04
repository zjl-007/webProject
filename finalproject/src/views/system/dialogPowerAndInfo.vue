<template>
  <div>
    <el-dialog
      title="'信息权限管理"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal='false'
    >
      <div class="editInfo">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepClone } from "../../util/util"
import {editUserInfo} from '../../api/sys/userControl'
export default {
  name: "DialogPowerAndInfo",
  data() {
    return {
      dialogVisible: false,
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
      powerData: {

      },
      infoRule: {
        username: [{required: true, message: '账户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        telphone: [{required: true, message: '电话不能为空', trigger: 'blur'}],
        email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
      },
      powerRule: {

      }
    };
  },
  created() {
  },
  methods: {
    show(row, type) {
      this.dialogVisible = true;
      this.infoData = deepClone(row);
    },
    ok() {
      console.log(this.infoData);
      this.$refs.infoForm.validate(async valid => {
        if(!valid) {
          this.$message.error("请检查输入项");
          return
        }
        try {
          let { code, message, err} = await editUserInfo(this.infoData);
          if(+code != 200) return this.$message.error(message + err + '');
          this.$message({type: 'success', message});
          this.dialogVisible = false;
          this.$emit('update');
        } catch (error) {
          return this.$message.error("系统错误");
        } 
      })
    },
  },
};
</script>