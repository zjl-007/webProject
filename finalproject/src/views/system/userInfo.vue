<template>
  <el-card class="box-card">
    <h3>用户信息修改</h3>
    <div class="form">
      <el-form ref="form" :model="uesrData" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="uesrData.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="uesrData.password" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="uesrData.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="telphone">
          <el-input v-model="uesrData.telphone" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description" clearable>
          <el-input v-model="uesrData.description"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <span>{{ uesrData.role ? '系统管理员' : '超级管理员' }}</span>
        </el-form-item>
        <el-form-item label="登录权限">
          <span>{{ uesrData.powerlogin ? '正常(可登录)' : '禁用(不可登录)' }}</span>
        </el-form-item>
        <el-form-item label="抓包权限">
          <span>{{ uesrData.powercapture ? '开启' : '禁用'}}</span>
        </el-form-item>
        <el-form-item label="数据库权限">
          <span>{{ uesrData.powerdb ? '读写' : '仅读'}}</span>
        </el-form-item>
        <el-button @click="getCurrentUserInfo" type="success">恢复</el-button>
        <el-button @click="submit" type="primary">提交</el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import {queryUserInfo} from "../../api/home/home"
import {editUserInfo} from "../../api/sys/userControl"
export default {
  name: 'UserInfo',
  data() {
    return {
      uesrData: {
        username: '',
        password: '',
        email: '',
        telphone: '',
        descrtption: '',
        powerlogin: '',
        powercapture: '',
        powerdb: '',
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur,submit'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur,submit'}],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur,submit'}],
        telphone: [{required: true, message: '请输入电话号码', trigger: 'blur,submit'}],
      }
    }
  },
  created() {
    this.getCurrentUserInfo();
  },
  methods: {
    async getCurrentUserInfo() {
      let idusers = window.sessionStorage.getItem("id")
      try {
        let {data:{code, data, message}} = await queryUserInfo({id: idusers});
        if(+code != 200) return this.$message.error(message);
        this.uesrData = data;
      } catch (error) {
        this.$message.error('系统错误。');
      }
    },
    async submit() {
      this.$refs.form.validate(async valid => {
        if(!valid) {
          return this.$message.error('请检查输入项！')
        }
        let idusers = window.sessionStorage.getItem("id")
        try {
          let params = {...this.uesrData}
          params.idusers = idusers;
          let {code, message} = await editUserInfo(params);
          if(+code != 200) return this.$message.error(message);
          this.$message({type: 'success', message});
        } catch (error) {
          this.$message.error('系统错误!');
        }
      }) 
    },
  }
}
</script>
<style lang="less" scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form {
  width: 400px;
}
</style>