<template>
  <div class="login">
    <div class="contentbox">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <h3 class="title">系统</h3>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        style="width: 345px; margin-top: 10px"
        label-width="80px"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password clearable></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-button
          type="primary"
          size="small"
          style="position: absolute; right: 55px"
          @click="loginBtn"
          >登录</el-button
        >
      </el-row>
    </div>
  </div>
</template>



<script>
import { login } from "../../api/login.js";
export default {
  name: "Login",
  created() {
    console.log("login");
  },
  data() {
    return {
      form: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    loginBtn() {
      this.$refs.form.validate((valid) => {
        // if (!valid) {
        //   this.$message({
        //     type: "warning",
        //     message: "请检查输入项",
        //   });
        //   return;
        // }
        login(this.form)
          .then((res) => {
            if (res.data.code !== 200) {
              this.$message({
                type: "warning",
                message: res.data.message,
              });
              return;
            }
            let { token, id } = res.data;
            if (token) {
              window.sessionStorage.setItem("token", token);
              window.sessionStorage.setItem("id", id);
              this.$router.push("/");
            }
            this.$message({
              type: "success",
              message: "登录成功",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
</script>

<style scoped lang="less">
.login {
  position: relative;
  height: 100%;
  background-color: #333333;
  .contentbox {
    position: absolute;
    height: 230px;
    width: 400px;
    border-radius: 3px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding-top: 30px;
    .logo {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      position: absolute;
      padding: 10px;
      left: 50%;
      top: -25%;
      transform: translate(-50%);
      border-radius: 50%;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 1px 1px 10px #eee;
      img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
      }
    }
  }
  .title {
    font-size: 22px;
    text-align: center;
    margin-top: 20px;
  }
}
</style>