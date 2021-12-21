<template>
  <!-- <el-header> -->
  <div class="top_header">
    <span></span>
    <div class="top_ri">
      <span>用户名：{{ userInfo.username }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <el-button type="primary" size="mini" @click="loginOut"
        style="margin-right: 20px"
      >退出</el-button>
    </div>
  </div>
  <!-- </el-header> -->
</template>

<script>
import { queryUserInfo } from "../../../api/home/home";
export default {
  name: "HomeHeader",
  data() {
    return {
      userInfo: {
        username: "",
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let id = window.sessionStorage.getItem("id");
      queryUserInfo({ id: id }).then((res) => {
        if (+res.data.code != 200) {
          this.$message({
            type: "info",
            message: res.data.message,
          });
          return;
        }
        this.$message({
          type: "success",
          message: "信息查询成功!",
        });
        this.userInfo = res.data.data;
      });
    },
    loginOut() {
      this.$confirm("退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功!",
        });
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("id");
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.top_header {
  position: relative;
  .top_ri {
    position: absolute;
    right: 0;
    span {
      height: 45px;
      line-height: 45px;
    }
  }
}
</style>